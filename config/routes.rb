Rails.application.routes.draw do
  get 'password_resets/new'
  get 'password_resets/edit'
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      devise_for :users, controllers: { registrations: 'api/v1/users',
                                        omniauth_callbacks: 'api/v1/users/omniauth_callbacks',
                                      }
      resources :users,       only: %i[create update destroy]
      resources :sessions,    only: %i[create destroy]
      resources :submissions, only: %i[index create show update destroy]
      
      get 'github_authorization',  to: "users#github_authorization"
      get 'twitter_authorization', to: "users#twitter_authorization"
      get 'users/authorize',       to: "users#authorize"
      # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    end
  end

  post 'password/forgot', to: 'password_resets#forgot'
  post 'password/reset', to: 'password_resets#reset'
  
  get 'logout', to: "api/v1/sessions#destroy"

  # forward all requests to StaticController#index but requests must be non-Ajax and HTML 
  # Mim type (req.format.html?). Does NOT include root "/" path.
  get '*page', to: 'static#index', constraints: -> (req) do
    !req.xhr? && req.format.html?
  end

  # forward root to StaticController#index
  root to: "static#index"
end
