class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session

    respond_to :json

    before_action :configure_permitted_parameters, if: :devise_controller?
    before_action :authenticate_user

    private 

    # allow for additional parameters not permitted by devise natively when applicable
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    end

    def authenticate_user
        binding.pry
        if request.headers['Authorization'].present?
            authenticate_or_request_with_http_token do |token|
                begin
                    jwt_payload = TokenAuth.decode(token)

                    @current_user_id = jwt_payload['id']
                rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
                    render json: {error: 'Invalid Request'}, status: :unauthorized
                end
            end
        else
            render json: {error: 'Invalid Request'}, status: :unauthorized
        end
    end

    def authenticate_user!(options = {})
        render json: {error: 'Invalid Request'}, status: :unauthorized unless signed_in?
    end

    def current_user
        # @current_user_id is set by authenticate_user when auth is successful
        @current_user || User.find(@current_user_id)
    end
    
    def signed_in?
        @current_user_id.present?
    end
end
