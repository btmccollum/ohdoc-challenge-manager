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
        binding.pry
    end

    def failure
        # binding.pry
    end
end