# TODO: move to lib folder, or at least to a new app/api_clients folder
#
class RapidApiClient
  BASE_URL = 'https://us-restaurant-menus.p.rapidapi.com'

  HEADERS  = {
    "x-rapidapi-host" => 'us-restaurant-menus.p.rapidapi.com',
    "x-rapidapi-key"  => Rails.application.credentials.dig(:rapid_api, :api_key),
  }

  DISTANCE = 10
  LAT      = 37.771150
  LONG     = -122.422060

  RESULTS_PER_PAGE = 25

  class << self

    def add_new_restaurants_for_coordinates latitude = LAT, longitude = LONG, distance = DISTANCE
      raise QuotaReachedError if quota_reached?

      raw_restaurants_data = []
      url = build_url(latitude, longitude, distance)
      response = HTTParty.get(url, headers: HEADERS)
      body = response.parsed_response

      remaining  = response.headers['x-ratelimit-requests-remaining'].to_i
      more_pages = body['result']['morePages']

      while needs_another_request?(more_pages, remaining) do
        raw_restaurants_data = raw_restaurants_data + body['result']['data']

        next_page = body['result']['page'] + 1
        next_page_url = build_url(latitude, longitude, distance, next_page)
        response = HTTParty.get(next_page_url, headers: HEADERS)
        body = response.parsed_response

        remaining  = response.headers['x-ratelimit-requests-remaining']
        more_pages = body['result']['morePages']
      end

      # This appends the results from the last page. It also catches the case when all results fit
      # on a single page.
      raw_restaurants_data = raw_restaurants_data + body['result']['data']

      write_all_to_db(raw_restaurants_data)
    end

    # `alias` to make it clear this is to be used both for initial bootstrap and periodic refreshes
    alias_method :bootstrap_restaurants_table_for_coordinates, :add_new_restaurants_for_coordinates

    private

    def write_all_to_db raw_data
      # First, get the rapid api ids
      raw_data_ids = raw_data.map { |data| data['restaurant_id'] }

      # Then store ids for restaurants to skip in a cache (just a hash with ids as keys)
      ids_to_skip = Restaurant.where(rapid_api_id: raw_data_ids)
                              .pluck(:rapid_api_id)
                              .reduce({}) do |cache, restaurant_id|
        cache[restaurant_id] = true
        cache
      end

      # Finally, write each restaurant to DB (as long as it's not already in the DB)
      raw_data.each do |data|
        begin
          next if ids_to_skip[data['restaurant_id']]
          write_to_db(data)
        rescue => e
          $stderr.puts "Error saving restaurant #{data['restaurant_name']} (#{data['restaurant_id']})."
          $stderr.puts "#{e.message}"
          next
        end
      end
    end

    def write_to_db restaurant_data
      geo = restaurant_data['geo']
      address = restaurant_data['address']

      r = Restaurant.new
      r.rapid_api_id = restaurant_data['restaurant_id']
      r.name = restaurant_data['restaurant_name']
      r.full_address = address['formatted']
      r.street = address['street']
      r.city = address['city']
      r.state = address['state']
      r.postal_code = address['postal_code']
      r.phone = restaurant_data['restaurant_phone']
      r.latitude = geo['lat']
      r.longitude = geo['lon']

      # They all seem empty, let's skip this for now
      # if restaurant_data['menus']
      #   write_menu_data_to_db(restaurant_data['menus'])
      # end

      r.save!
    end

    # def write_menu_data_to_db menu_data
    #   menu_data.each do |menu_item|
    #     write_menu_item_to_db(menu_item)
    #   end
    # end

    # def write_menu_item_to_db menu_item

    # end

    def update_requests_remaining remaining
      # TODO: save in DB
      raise QuotaReachedError if quota_reached?
    end

    def quota_reached?
      # TODO: read from DB and reset at begining of month
      return false
    end

    # TODO: name is inaccurate and it has hidden behavior
    def needs_another_request? more_pages, remaining
      update_requests_remaining(remaining)
      more_pages
    end

    def build_url latitude, longitude, distance, page = 1
      "#{BASE_URL}/restaurants/search/geo?page=#{page}&lon=#{longitude}&lat=#{latitude}&distance=#{distance}"
    end
  end

  class QuotaReachedError < StandardError
  end
end
