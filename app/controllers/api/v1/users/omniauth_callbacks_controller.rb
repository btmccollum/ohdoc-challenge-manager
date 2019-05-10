class Api::V1::Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def github
        user = User.find_by(state_token: params[:state])  
        
        if user
        temp_url = Faraday.new(url: "https://github.com/login/oauth/access_token")

        auth_code_request = temp_url.post do |req|
          client_id: ENV['GITHUB_KEY'],
          client_secret: ENV['GITHUB_SECRET'],
          code: params[:code],
        end

        binding.pry
        user.github_token = params[:access_token]
        # response will be form of access_token=e72e16c7e42f292c6912e7710c838347ae178b4a&token_type=bearer
        
        # calls are made with 
        # Authorization: token OAUTH-TOKEN
        # GET https://api.github.com/user
        user.update_from_omniauth(request.env["omniauth.auth"])

        if user.save
             redirect_to 'http://localhost:3001'
        end   
    else 
        redirect_to 'http://localhost:3001', error: { message: 'Unauthorized user.' }
    end

    def twitter
    end

    def failure
        # binding.pry
    end
end