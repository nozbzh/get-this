class Api::RestaurantsController < ApplicationController
  def index
    restaurants = Restaurant.all.as_json(only: [:id, :name])
    render json: restaurants
  end
end
