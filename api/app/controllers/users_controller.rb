module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_api_v1_user!

      def currentuser
        @user = current_api_v1_user
        render json: { status: 'SUCCESS', message: 'Loaded the user', data: @user}
      end

    end
  end
end
