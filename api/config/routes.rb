Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        omniauth_callbacks: "api/v1/auth/omniauth_callbacks",
      }

      namespace :reading do
        resources :posts, only: [:index, :show]
        get :change_status_from_reading_to_registered, to: "posts#change_status_from_reading_to_registered"
      end

      namespace :registered do
        resources :posts, only: [:index, :show]
        get "/posts/exchange_registered_and_reading_post/:id", to: "posts#exchange_registered_and_reading_post"
      end

      namespace :completed do
        resources :posts, only: [:index, :show]
      end

      namespace :share do
        resources :posts, only: [:index, :show]
      end

      resources :posts, only: [:index, :show, :create, :update, :destroy]
      get "users/currentuser"
      get :health_check, to: "health_check#index"
    end
  end
end
