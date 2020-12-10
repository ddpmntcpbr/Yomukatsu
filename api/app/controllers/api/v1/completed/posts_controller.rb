class Api::V1::Completed::PostsController < Api::V1::ApiController
  before_action :authenticate_user!, only: [:index, :show]

  def index
    posts = current_user.posts.completed.order(updated_at: :desc)
    render json: posts
  end

  def show
    post = current_user.posts.completed.find(params[:id])
    render json: post
  end
end
