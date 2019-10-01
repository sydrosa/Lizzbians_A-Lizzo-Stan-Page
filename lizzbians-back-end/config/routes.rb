Rails.application.routes.draw do
  resources :questions, only: [:index]
  resources :games, only: [:index, :create]
  resources :users
  resources :answers, only: [:show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html


  get '/games/:game_type', to: 'games#index'

end
