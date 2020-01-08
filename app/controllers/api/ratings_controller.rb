class Api::RatingsController < ApplicationController
  before_action :ensure_authenticated

  def get_restaurant_ratings_by_user
    byebug

    ratings = Rating.where(user_id: current_user.id, restaurant_id: params['restaurant_id'])

    render json: ratings, status: :ok
  end

  def rate
    enveloppe = {}

    begin
      # Here we ensure that, if present, we fetch the existing rating for the current user and the
      # current item
      params_for_query = rating_params.except(:rating).merge(user_id: current_user.id)
      rating = Rating.find_or_initialize_by(params_for_query)
      rating.rating = rating_params[:rating]

      if rating.save
        enveloppe[:rating] = rating
        render json: enveloppe, status: :ok
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

  def ensure_authenticated
    unless current_user
      enveloppe = {errors: ['You need to be logged in to do this']}
      render json: enveloppe, status: :unauthorized
    end
  end

  def rating_params
    params.require(:rating).permit(:rating, :restaurant_id, :item_id, :note)
  end
end
