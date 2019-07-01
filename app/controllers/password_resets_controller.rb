class PasswordResetsController < ApplicationController
  skip_before_action :authenticate_user

  def forgot
    if params[:email].blank?
      return render json: {error: 'Please provide a valid email address.'}
    end

    user_email = params[:email].downcase.strip

    user = User.find_by(email: user_email)

    if user.present?
      user.generate_password_token!
      user.send_password_reset_email

      render json: { status: 'ok' }, status: :ok
    else
      render json: { error: ['Email address provided is not valid. Please try again.'] }, status: :not_found
    end
  end

  def reset
    binding.pry
    token = params[:token].to_s

    if params[:email].blank?
      render json: { error: 'Token not provided.' }
    end

    user = User.find_by(reset_password_token: token)

    if user.present? && user.password_token_valid? 
      if user.reset_password!(params[:password])
        render json: { status: 'ok' }, status: :ok
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: ['Invalid link or link has expired.'] }, status: :not_found
    end

  end
end
