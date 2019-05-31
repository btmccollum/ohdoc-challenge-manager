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

  def update
    if params[:id].to_i == current_user.id
      # update user based on user_params passed in and create new user_hash to pass back
      current_user.update(user_params)
      user_hash = UserSerializer.new(current_user).serializable_hash
      jwt = current_user.generate_jwt

      render json: {user: user_hash, jwt: jwt}, status: :ok
    else
      render json: { error: "Unauthorized access" }, status: 422
    end
  end

  def destroy
    current_user.destroy
    render json: { message: "Successful" }, status: 422
  end

  # a user must be redirected to GitHub's access page to provide authorization to app
  def github_authorization
    # state token is for our use only, state token ensures client is the same on both ends when it comes back to oauth callback
    current_user.generate_state_token

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
    
    consumer = OAuth::Consumer.new(
      ENV['TWITTER_KEY'], 
      ENV['TWITTER_SECRET'], 
      site: "https://api.twitter.com", 
      oauth_callback: ENV['TWITTER_RURI']
    )
   
    request_token_step = consumer.get_request_token(oauth_callback: ENV['TWITTER_RURI'])

    request_token = request_token_step.token
    request_secret = request_token_step.secret

    current_user.update(state_token: request_token, state_token_verify: request_secret)

    # generate auth link user must visit to provide permission
    redirect_url = request_token_step.authorize_url(oauth_callback: ENV['TWITTER_RURI'])
  
    render json: redirect_url
  end

  private

  def user_params
    params.require(:user).permit(:twitter_username, :github_username, :email, :password, :password_confirmation, :twitter_token, :github_token, :github_repo_url, :github_repo_path,)
  end
end
