class Api::V1::Posts::CompletedController < Api::V1::ApiController
  before_action :authenticate_user!, only: [:index]

  def index
    posts = current_user.posts.completed
    render json: posts
  end
end
