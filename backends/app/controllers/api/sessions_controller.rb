module Api
  # Sessions
  class SessionsController < PublicController
    def forgot_password
      forgot_password = ForgotPassword.call(params[:email])
      if forgot_password.success?
        render json: { result: :ok }
      else
        render json: {
          errors: forgot_password.errors[:forgot_password].join(', ')
        }, status: 422
      end
    end

    def check_register_token
      register_token = CheckRegisterToken.call(params[:register_token])
      if register_token.success?
        render json: { result: :ok }, status: 200
      else
        render json: {
          errors: register_token.errors[:register_token].join(', ')
        }, status: 422
      end
    end

    def reset_password
      reset_password = ResetPassword.call(params[:token], params[:password],
                                          params[:confirm_password])
      if reset_password.success?
        render json: { result: :ok }
      else
        render json: {
          errors: reset_password.errors[:reset_password].join(', ')
        }, status: 422
      end
    end
  end
end
