class Api::RatingsController < ApplicationController
  def get_restaurant_ratings_by_user
    user_id = params['user_id']
    restaurant_id = params['restaurant_id']

    ratings = Rating.where(user_id: user_id, restaurant_id: restaurant_id)

    render json: ratings, status: :ok
  end

  def create
    enveloppe = {}
    begin
      rating = Rating.new(rating_params)
      if rating.save
        enveloppe[:rating] = rating
        render json: enveloppe, status: :created
      else
        enveloppe[:errors] = rating.errors
        render json: enveloppe, status: :unprocessable_entity
      end
    rescue => e
      enveloppe[:errors] = [e.message]
      render json: enveloppe, status: :server_error
    end
  end

  private

  def rating_params
    params.require(:rating).permit(:rating, :restaurant_id, :item_id, :user_id, :note)
  end
end
