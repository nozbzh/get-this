Rails.application.routes.draw do
  devise_for :users

  root 'welcome#home'

  resources :restaurants, only: [:show]
end
