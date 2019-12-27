Rails.application.routes.draw do
  devise_for :users

  root 'welcome#home'

  resources :restaurants, only: [:show] do
    post 'search', on: :collection
  end
end
