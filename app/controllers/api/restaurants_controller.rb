# TODO: not used since restaurants are currently passed as data-attributes
# Decide whether to use an API call (the action below) or just delete this whole file and its route
class Api::RestaurantsController < ApplicationController
  def index
    restaurants = Restaurant.all.as_json(only: [:id, :name])
    render json: restaurants
  end
end
