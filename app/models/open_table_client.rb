# TODO: move to lib folder, or at least to a new app/api_clients folder
#
class OpenTableClient
  BASE_URL  = 'https://opentable.herokuapp.com/api'
  PAGE_SIZE = 100

  class << self

    def add_new_restaurants_for_city city
      raw_restaurants_data = []
      response = HTTParty.get(build_url(city))
      body = response.parsed_response

      total_entries = body['total_entries']
      current_page = body['current_page']

      while needs_another_request?(total_entries, current_page) do
        raw_restaurants_data = raw_restaurants_data + body['restaurants']

        full_url = "#{build_url(city)}&page=#{current_page + 1}"
        response = HTTParty.get(full_url)
        body = response.parsed_response

        total_entries = body['total_entries']
        current_page = body['current_page']
      end

      # This appends the results from the last page. It also catches the case when all results fit
      # on a single page.
      raw_restaurants_data = raw_restaurants_data + body['restaurants']

      write_all_to_db(raw_restaurants_data)
    end

    # `alias` to make it clear this is to be used both for initial bootstrap and periodic refreshes
    alias_method :bootstrap_restaurants_table_for_city, :add_new_restaurants_for_city

    private

    def write_all_to_db raw_data
      # First, get the open table ids
      raw_data_ids = raw_data.map { |data| data['id'] }

      # Then store ids for restaurants to skip in a cache (just a hash with ids as keys)
      ids_to_skip = Restaurant.where(open_table_id: raw_data_ids)
                              .pluck(:open_table_id)
                              .reduce({}) do |cache, restaurant_id|
        cache[restaurant_id] = true
        cache
      end

      # Finally, write each restaurant to DB (as long as it's not already in the DB)
      raw_data.each do |data|
        begin
          next if ids_to_skip[data['id']]
          write_to_db(data)
        rescue => e
          $stderr.puts "Error saving restaurant #{data['name']} (#{data['id']})."
          $stderr.puts "#{e.message}"
          next
        end
      end
    end

    def write_to_db restaurant_data
      r = Restaurant.new
      r.open_table_id = restaurant_data['id']
      r.name = restaurant_data['name']
      r.address = restaurant_data['address']
      r.city = restaurant_data['city']
      r.state = restaurant_data['state']
      r.postal_code = restaurant_data['postal_code']
      r.country = restaurant_data['country']
      r.phone = restaurant_data['phone']
      r.latitude = restaurant_data['lat']
      r.longitude = restaurant_data['lng']
      r.open_table_image_url = restaurant_data['image_url']

      r.save!
    end

    def needs_another_request? total_entries, current_page
      (current_page * PAGE_SIZE) < total_entries
    end

    def build_url city
      url_friendly_city = city.split(' ').join('+')
      "#{BASE_URL}/restaurants?city=#{url_friendly_city}&per_page=#{PAGE_SIZE}"
    end
  end
end
