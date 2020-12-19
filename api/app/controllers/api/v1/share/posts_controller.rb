class Api::V1::Share::PostsController < ApplicationController
  def index
    posts = Post.order(updated_at: :desc)
    render json: posts
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end
end
