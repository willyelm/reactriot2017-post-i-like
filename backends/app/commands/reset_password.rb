class ResetPassword

  prepend SimpleCommand

  def initialize(token, password, confirm_password)
    @token = token
    @password = password
    @confirm_password = confirm_password
  end

  def call
    if user
      if update_password(user)
        true
      else
        errors.add(:reset_password, 'Password is too short or Password confirmation doesn\'t match Password')
        false
      end
    else
      false
    end
  end

  # immutable state
  def user
    @user ||= User.find_by_id(decoded_auth_token[:user_forgot_password_id]) if decoded_auth_token
    @user || errors.add(:reset_password, 'Invalid token') && nil
  end

  def decoded_auth_token
    @decode_reset_password_token ||= JsonWebToken.decode(@token)
  end

  def update_password(user)
    user.password = @password
    user.password_confirmation = @confirm_password
    user.save
  end

end
