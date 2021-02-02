class Api::V1::PostsController < Api::V1::ApiController
  before_action :authenticate_user!

  def index
    posts = current_user.posts.order(created_at: :desc)
    render json: posts
  end

  def show
    post = current_user.posts.find(params[:id])
    render json: post
  end

  def create
    post = current_user.posts.new(post_params)
    post.remote_twitter_card_image_url = post_params[:image]
    post.save!
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

    def post_params
      params.require(:post).permit(:title, :url, :author, :image, :twitter_card_image, :status, post_items_attributes: [:id, :content, :_destroy])
    end
end
