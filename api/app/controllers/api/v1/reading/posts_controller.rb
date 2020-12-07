class Api::V1::Reading::PostsController < Api::V1::ApiController
  before_action :authenticate_user!, only: [:index, :show]

  def index
    posts = current_user.posts.reading.order(created_at: :desc)
    render json: posts
  end

  def show
    post = current_user.posts.reading.find(params[:id])
    render json: post
  end

  def change_status_from_reading_to_registered
    @post = current_user.posts.reading.first
    if @post.present?
      @post.update!(status: "registered")
    end
    render json: @post, status: 200
  end
end
