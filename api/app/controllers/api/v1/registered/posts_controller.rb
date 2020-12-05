class Api::V1::Registered::PostsController < Api::V1::ApiController
  before_action :authenticate_user!, only: [:index,:show]

  def index
    posts = current_user.posts.registered.order(created_at: :desc)
    render json: posts
  end

  def show
    post = current_user.posts.registered.find(params[:id])
    render json: post
  end
end
