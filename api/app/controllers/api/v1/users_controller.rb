class Api::V1::UsersController < Api::V1::ApiController
  before_action :authenticate_user!

  def destroy
    @user = current_api_v1_user
    @user.destroy!
    render json: { status: "SUCCESS", message: "Delete the user", data: @user }
  end

  def currentuser
    @user = current_user
    render json: { status: "SUCCESS", message: "Loaded the user", data: @user }
  end
end
