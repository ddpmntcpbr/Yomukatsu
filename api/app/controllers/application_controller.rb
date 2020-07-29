class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :skip_session
  skip_before_action :verify_authenticity_token, if: :devise_controller?

  protected
    def skip_session
      request.session_options[:skip] = true
    end
end
