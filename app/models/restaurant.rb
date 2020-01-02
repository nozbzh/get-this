class Restaurant < ApplicationRecord
  self.table_name = 'rapid_api_restaurants'
  has_many :items
end
