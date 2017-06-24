class CheckRegisterToken
  prepend SimpleCommand

  def initialize(token)
    @token = token
  end

  def call
    if user
      if confirm_token(user)
        true
      else
        errors.add(:register_token, 'Some thing went wrong !!!')
        false
      end
    else
      false
    end
  end

  # immutable state
  def user
    if decoded_auth_token
      user_token = decoded_auth_token[:user_registration_id]
      @user ||= User.find_by_id(user_token)
    end
    @user || errors.add(:register_token, 'Invalid token') && nil
  end

  def decoded_auth_token
    @decode_reset_password_token ||= JsonWebToken.decode(@token)
  end

  def confirm_token(user)
    if user.confirmed_at.present?
      # errors.add(:register_token, 'Your account has been verified')
      true
    else
      user.confirmed_at = Time.now.utc
      user.save
    end
  end
end
