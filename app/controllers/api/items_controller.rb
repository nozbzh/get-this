class Api::ItemsController < ApplicationController
  before_action :ensure_authenticated, only: [:create]

  def get_items_by_restaurant
    items = Item.where(restaurant_id: params['restaurant_id']).as_json(only: [:id, :name])

    render json: items, status: :ok
  end

  def create
    enveloppe = {}

    begin
      item = Item.new(item_params)

      if item.save
        enveloppe[:item] = item
        render json: enveloppe, status: :created
      else
        enveloppe[:errors] = item.errors
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

  def item_params
    params.require(:item).permit(:name)
  end
end
