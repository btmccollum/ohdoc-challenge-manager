class Api::V1::SessionsController < ApplicationController
    def create
      user_password = params[:password]
      user_email = params[:email]
      user = user_email.present? && User.find_by(email: user_email)
  
      if user.valid_password?(user_password)
        sign_in user
        jwt_token = user.generate_jwt
        render json: { user: user, jwt: jwt_token } status: :ok
      else
        render json: { errors: "Invalid email or password" }, status: 422
      end
    end

    def destroy
        render json: { message: "Successful" }, status: :ok
    end
  end