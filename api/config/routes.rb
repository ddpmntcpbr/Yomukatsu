Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'posts/show'
    end
  end
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        omniauth_callbacks: "api/v1/auth/omniauth_callbacks",
      }

      resources :posts, only: [:show, :create, :update, :destroy]
      get "users/currentuser"
    end
  end
end
