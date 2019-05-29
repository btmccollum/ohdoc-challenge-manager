class Api::V1::Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    skip_before_action :verify_authenticity_token
    skip_before_action :authenticate_user

    def github
        user = User.find_by(state_token: params[:state])  
        
        if user
            # GitHub uses OAuth2
            temp_url = Faraday.new(url: "https://github.com/login/oauth/access_token")

            auth_code_request = temp_url.post do |req|
              req.params['client_id'] = ENV['GITHUB_KEY']
              req.params['client_secret'] = ENV['GITHUB_SECRET']
              req.params['code'] = params[:code]
            end
        
            user.update_from_omniauth(request.env["omniauth.auth"])

                if user.save
                    redirect_to 'https://localhost:3000'   
                else 
                    redirect_to 'https://localhost:3000', error: { message: 'Unauthorized user.' }
                end
        else 
            redirect_to 'https://localhost:3000', error: { message: 'Unauthorized user.' }
        end
    end

    def twitter
        user = User.find_by(state_token: params[:oauth_token])

        if user 
            # Twitter uses OAuth not OAuth2
            consumer = OAuth::Consumer.new(
                ENV['TWITTER_KEY'], 
                ENV['TWITTER_SECRET'], 
                site: "https://api.twitter.com", 
                oauth_callback: ENV['TWITTER_RURI']
            )

            hash = { oauth_token: user.state_token, oauth_token_secret: user.state_token_verify }
            request_token  = OAuth::RequestToken.from_hash(consumer, hash)
            access_token = request_token.get_access_token(oauth_verifier: params[:oauth_verifier]) 
         
            user.twitter_username = access_token.params["screen_name"]
            # user.twitter_url = "https://twitter.com/#{user.twitter_username}"

            # need to save these and use them in the future potentially
            user.twitter_token = access_token.params["oauth_token"]
            user.twitter_token_secret = access_token.params["oauth_token_secret"]
            user.save

            redirect_to 'https://localhost:3000'  
        else
            redirect_to 'https://localhost:3000', error: { message: 'Unauthorized user.' }
        end
    end

    def failure
        redirect_to 'https://localhost:3000', error: { message: 'Oops! Something went wrong.' }, status: 500
    end
end