class Api::V1::Registered::PostsController < Api::V1::ApiController
  before_action :authenticate_user!, only: [:index, :show]

  def index
    posts = current_user.posts.registered.order(created_at: :desc)
    render json: posts
  end

  def show
    post = current_user.posts.registered.find(params[:id])
    render json: post
  end

  def exchange_registered_and_reading_post
    @reading_post = current_user.posts.reading.first
    if @reading_post.present?
      @reading_post.update!(status: "registered")
    end
    @post = current_user.posts.registered.find(params[:id])
    @post.update!(status: "reading")
    render json: @post
  end
end
