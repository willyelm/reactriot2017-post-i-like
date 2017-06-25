module Api
  # Only for functions after login
  class PrivateController < ActionController::Base
    before_action :authenticate_request

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
