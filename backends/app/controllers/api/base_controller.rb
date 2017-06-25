module Api
  # Base
  class BaseController < ActionController::Base
    # before_action :authenticate_request, except: %I[
    #   register_user check_register_token forgot_password reset_password create_post_url
    # ]
    attr_reader :current_user

    private

    def authenticate_request
      @current_user =
        AuthorizeApiRequest.call(request.headers['authorization-token']).result
      if @current_user
        @current_user
      else
        render json: { error: 'Not Authorized' }, status: 401
      end
    end
  end
end
