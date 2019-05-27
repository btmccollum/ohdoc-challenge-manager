class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_user, only: %i[create]

  def authorize
    
    user_hash = UserSerializer.new(current_user).serializable_hash
    jwt = current_user.generate_jwt
    render json: { user: user_hash, jwt: jwt }, status: :ok
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
   
    # state token is for our use only, state token ensures client is the same on both ends when it comes back to oauth callback
    redirect_info = {
      query_params: {
        client_id: ENV['GITHUB_KEY'],
        redirect_uri: ENV['GH_RURI'],
        state: current_user.state_token,
        scope: "repo" 
      }.to_query,
      url: "https://github.com/login/oauth/authorize?"
    }

    render json: redirect_info
  end

  def twitter_authorization
    # using OAuth gem to create a new consumer object to grab request token from twitter, need to use OAuth1 strat for Twitter only
    # see : https://github.com/oauth-xx/oauth-ruby
    consumer = OAuth::Consumer.new(ENV['TWITTER_KEY'], ENV['TWITTER_SECRET'], site: "https://api.twitter.com")
    request_token_step = consumer.get_request_token(oauth_callback: ENV['TWITTER_RURI'])

    request_token = request_token_step.token
    request_secret = request_token_step.secret

    # generate auth link user must visit to provide permission
    redirect_url = request_token_step.authorize_url(oauth_callback: ENV['TWITTER_RURI'])
    
    render json: redirect_url
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :twitter_token, :github_token)
  end
end
