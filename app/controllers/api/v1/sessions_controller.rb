class Api::V1::SessionsController < ApplicationController
  skip_before_action :authenticate_user

  def create
    user_password = params[:user][:password]
    user_email = params[:user][:email]
    user = user_email.present? && User.find_by(email: user_email)
    user_hash = UserSerializer.new(user).serializable_hash

    if user.valid_password?(user_password)
      sign_in user
      jwt_token = user.generate_jwt
      render json: { user: user_hash, jwt: jwt_token }, status: :ok
    else
      render json: { errors: "Invalid email or password" }, status: 422
    end
  end

  def destroy
      render json: { message: "Successful" }, status: :ok
  end
end