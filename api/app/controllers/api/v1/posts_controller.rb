class Api::V1::PostsController < Api::V1::ApiController
  before_action :authenticate_user!

  def show
    post = current_user.post.find(params[:id])
    render json: post
  end

  def create
    post = current_user.posts.create!(post_params)
    render json: post
  end

  def update
    @post = current_user.posts.find(params[:id])
    @post.update!(post_params)
    render json: @post
  end

  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy!
    render json: {}, status: :ok
  end

  private

    def posts_params
      params.require(:post).permit(:title, :url, :image, :status, post_items_attributes: [:content])
    end
end
