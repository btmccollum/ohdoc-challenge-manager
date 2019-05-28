class Api::V1::Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    skip_before_action :verify_authenticity_token
    skip_before_action :authenticate_user

    def github
        user = User.find_by(state_token: params[:state])  
        
        if user
            temp_url = Faraday.new(url: "https://github.com/login/oauth/access_token")

            auth_code_request = temp_url.post do |req|
              req.params['client_id'] = ENV['GITHUB_KEY']
              req.params['client_secret'] = ENV['GITHUB_SECRET']
              req.params['code'] = params[:code]
            end
        
            # calls are made with 
            # Authorization: token OAUTH-TOKEN
            # GET https://api.github.com/user
            user.update_from_omniauth(request.env["omniauth.auth"])

                if user.save
                    redirect_to 'http://localhost:3000'   
                else 
                    redirect_to 'http://localhost:3000', error: { message: 'Unauthorized user.' }
                end
        else 
            redirect_to 'http://localhost:3000', error: { message: 'Unauthorized user.' }
        end
    end

    def twitter
        # <ActionController::Parameters {"oauth_token"=>"IwxcxAAAAAAA-TjHAAABawArYwU", 
        # "oauth_verifier"=>"mhmVZB3MIguABToNoa7NFMgv6z0WSvGx", "format"=>:json, 
        # "controller"=>"api/v1/users/omniauth_callbacks", "action"=>"twitter"} permitted: false>
        binding.pry
        user = User.find_by(state_token: params[:oauth_token])

        if user 
            consumer = OAuth::Consumer.new(
                ENV['TWITTER_KEY'], 
                ENV['TWITTER_SECRET'], 
                site: "https://api.twitter.com", 
                oauth_callback: ENV['TWITTER_RURI']
            )

            hash = { oauth_token: user.state_token, oauth_token_secret: session[:token_secret]}
            request_token  = OAuth::RequestToken.from_hash(consumer, hash)
            access_token = request_token.get_access_token
            # For 3-legged authorization, flow oauth_verifier is passed as param in callback
            # @access_token = @request_token.get_access_token(oauth_verifier: params[:oauth_verifier]) 
            # @photos = @access_token.get('/photos.xml')

        else
            redirect_to 'http://localhost:3000', error: { message: 'Unauthorized user.' }
        end
    end

    def failure
        # binding.pry
    end
end