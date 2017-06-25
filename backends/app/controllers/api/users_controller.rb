module Api
  # API
  class UsersController < PublicController
    def create
      if authentication_user.success?
        render json: {
          result: :ok,
          authentication: authentication_user.result[:token],
          user: authentication_user.result[:user]
        }
      else
        render json: {
          errors: authentication_user.errors[:authentication].join(', ')
        }, status: 422
      end
    end

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

    def change_password
      change_password = ChangePassword.call(
        token: params[:token],
        current_password: params[:current_password],
        new_password: params[:new_password],
        confirmed_new_password: params[:confirmed_new_password]
      )
      if change_password.result
        render json: { result: :ok }
      else
        render json: { errors: change_password.errors[:change_password] }
      end
    end

    def register_user
      register_user = RegisterUser.call(params)
      if register_user.success?
        render json: { result: :ok }, status: 200
      else
        render json: {
          errors: register_user.errors[:register_user].join('<br>')
        }, status: 422
      end
    end

    private

    def authentication_user
      AuthenticationUser.call(
        params[:email],
        params[:password]
      )
    end
  end
end
