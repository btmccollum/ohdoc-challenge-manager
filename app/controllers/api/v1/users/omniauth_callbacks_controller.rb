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

    def github_setup
        binding.pry
        Faraday.new(:url => 'https://github.com/login/oauth/authorize')
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