class Api::V1::Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    # def reddit
    #     user = User.find_by(state_token: params[:state])   
    
    #     user.update_from_omniauth(request.env["omniauth.auth"])

    #     if user.save
    #         user.linked = true
    #         user.save
         
    #         # redirect_to 'http://localhost:3001'
    #         # adding redirect for herkou deployment
    #         redirect_to 'https://droplet-app.herokuapp.com/'
    #     end   
    # end

    def github_authorization
        current_user.generate_state_token
        
        auth= Faraday.new(:url => 'https://github.com/login/oauth/authorize')

        auth_request = auth.get do |req|
            # req.headers['Authorization'] = "bearer #{current_user.reddit_token}"
            # req.headers['User-Agent'] = "Ruby:Droplet API/0.0.0 by u/unovie"
            # req.params['limit'] = 100
            req.headers['client_id'] = ENV["GITHUB_KEY"]
            req.headers['redirect_uri'] = ENV["GH_RURI"]
            req.headers['state'] = current_user.state_token
        end

        redirect_to 
    end

    def github
        user.update_from_omniauth(request.env["omniauth.auth"])

        if user.save
             user.linked = true
             user.save
         
             redirect_to 'http://localhost:3001'
         end   
    end

    def twitter
    end

    def failure
        # binding.pry
    end
end