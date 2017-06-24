class AuthorizeApiRequest

  prepend SimpleCommand

  def initialize(token)
    @token = token
  end

  def call
    member
  end

  private

  attr_reader :token

  def member
    @member ||= User.find_by_id(decoded_auth_token[:user_login_id]) if decoded_auth_token
    @member || errors.add(:token, 'Invalid token') && nil
  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(token)
  end

end
