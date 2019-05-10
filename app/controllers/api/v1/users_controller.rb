class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_user, only: %i[create]

  def show
    user_hash = UserSerializer.new(current_user).serializable_hash
    render json: { user: user_hash }, status: :ok
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

  def github_authorization
    current_user.generate_state_token
    auth = Faraday.new(:url => 'https://github.com/login/oauth/authorize')

    auth_request = auth.get do |req|
        req.headers['client_id'] = ENV["GITHUB_KEY"]
        req.headers['redirect_uri'] = ENV["GH_RURI"]
        req.headers['state'] = current_user.state_token
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :twitter_token, :github_token)
  end
end
