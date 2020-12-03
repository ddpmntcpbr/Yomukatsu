class Api::V1::Posts::ReadingController < Api::V1::ApiController
  before_action :authenticate_user!, only: [:index]

  def index
    posts = current_user.posts.reading
    render json: posts
  end
end
