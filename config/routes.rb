Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      devise_for :users
      resources :submissions, only: %i[index create show update destroy]
      # get 'pages/root'
      # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    end
  end
  
  # forward all requests to StaticController#index but requests must be non-Ajax and HTML 
  # Mim type (req.format.html?). Does NOT include root "/" path.
  get '*page', to: 'static#index', constraints: -> (req) do
    !req.xhr? && req.format.html?
  end

  # forward root to StaticController#index
  root to: "static#index"
end
