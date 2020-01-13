Rails.application.routes.draw do
  devise_for :users

  root 'welcome#home'

  namespace :api, defaults: { format: :json } do
    resources :restaurants, only: [:index]

    resources :items, only: [:create] do
      collection do
        get 'get_items_by_restaurant'
      end
    end

    resources :ratings, only: [] do
      collection do
        get 'get_restaurant_ratings_by_user'
        post 'rate'
      end
    end
  end

  resources :restaurants, only: [:show] do
    post 'search', on: :collection
  end
end
