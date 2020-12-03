Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        omniauth_callbacks: "api/v1/auth/omniauth_callbacks",
      }

      namespace :posts do
        resources :reading, only: [:index]
        resources :registered, only: [:index]
        resources :completed, only: [:index]
      end

      resources :posts, only: [:index, :show, :create, :update, :destroy]
      get "users/currentuser"
      get :health_check, to: "health_check#index"
      get :users_count, to: "users_count#index"
    end
  end
end
