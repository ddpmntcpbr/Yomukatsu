class Api::V1::UsersCountController < ApplicationController
  def index
    render json: User.count
  end
end
