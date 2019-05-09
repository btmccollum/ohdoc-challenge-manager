class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_user, only: %i[create]

  def show
    render json: { user: current_user }, status: :ok
  end

  def create
    user = User.new(user_params)

    if user.save
      user_hash = UserSerializer.new(user).serializable_hash
      jwt = user.generate_jwt
      render json: { user: user_hash, jwt: jwt }, status: :ok
    else
      render json: { errors: user.errors}, status: 422    
    end
  end

  def destroy
    current_user.destroy
    render json: { message: "Successful" }, status: 422
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :twitter_token, :github_token)
  end
end
