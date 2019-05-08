class Api::V1::UsersController < ApplicationController
    before_action :authenticate_user!

    private

    def user_params
        params.require(:user).permit(:username, :email, :password, :twitter_token, :github_token)
    end
end
