module Api
  # Only for functions after login
  class InfoController < PrivateController
    def token
      render json: {
        token: @current_user.token
      }
    end
  end
end
