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

  # a user must be redirected to GitHub's access page to provide authorization to app
  def github_authorization
    current_user.generate_state_token
   
    # state token is for our use only, state token ensures client is the same on both ends
    query_params = {
      client_id: ENV['GITHUB_KEY'],
      redirect_uri: ENV['GH_RURI'],
      state: current_user.state_token,
    }.to_query

    url = "https://github.com/login/oauth/authorize"
    
    redirect_to "#{url}?#{query_params}"
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :twitter_token, :github_token)
  end
end
