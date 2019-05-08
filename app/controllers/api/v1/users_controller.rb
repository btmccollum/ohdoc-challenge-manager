class Api::V1::UsersController < ApplicationController
    def create
        user = User.new(user_params)

        if user.save
            jwt = Auth.encrypt({id: user.id})
            render json: { user: user, jwt: jwt }, status: :ok
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :email, :password, :twitter_token, :github_token)
    end
end
