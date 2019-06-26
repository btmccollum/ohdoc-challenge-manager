class PasswordResetsController < ApplicationController
  def forgot
    if paras[:email].blank?
      return render json: {error: 'Please provide a valid email address.'}
    end

    user = User.find_by(email: email.downcase)

    if user.present? && user.confirmed_at?
      user.generate_password_token!

      user.send_password_reset_email

      render json: { status: 'ok' }, status: :ok
    else
      render json: { error: ['Email address provided is not valid. Please try again.'] }, status: :not_found
  end

  def reset
    token = params[:token].to_s

    if params[:email].blank?
      returnn render json: { error: 'Token not provided.' }
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
