Rails.application.routes.draw do
  root to: 'map#index'

  resource :map, only: [:index]
  namespace :api do 
    resources :polygons, only: [:index, :create, :show]
  end
end
