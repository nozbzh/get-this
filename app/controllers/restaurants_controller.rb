class RestaurantsController < ApplicationController
  def show
    @restaurant = Restaurant.includes(:items).find(params[:id])

    # ratings = if current_user
      # Rating.where(user: current_user, restaurant: @restaurant)
    ratings = if true
      Rating.where(restaurant: @restaurant)
    else
      Rating.none
    end

    @ratings_hash = {}

    ratings.each do |r|
      @ratings_hash[r.item_id] = r.rating
    end

    # TODO: decorate ratings based on their ratings
  end

  def search
    restaurant = Restaurant.find(params[:restaurant_id])
    if restaurant
      flash[:notice] = nil # Bandaid. Figure out why it stays set from the `else` branch
      redirect_to restaurant_path(restaurant.id)
    else
      flash[:notice] = "can't find it"
      render "welcome/home"
    end
  end
end
