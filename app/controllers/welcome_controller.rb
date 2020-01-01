class WelcomeController < ApplicationController
  def home
    @restaurants = Restaurant.all.as_json(only: [:id, :name])
  end
end
