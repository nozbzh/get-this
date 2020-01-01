Rails.application.routes.draw do
  devise_for :users

  root 'welcome#home'

  namespace :api, defaults: { format: :json } do
    resources :restaurants, only: [:index]
  end

  resources :restaurants, only: [:show] do
    post 'search', on: :collection
  end
end
