class Api::V1::Posts::RegisteredController < Api::V1::ApiController
  before_action :authenticate_user!, only: [:index]

  def index
    posts = current_user.posts.registered
    render json: posts
  end
end
