class ForgotPassword

  prepend SimpleCommand

  def initialize(email)
    @email = email
  end

  def call
    if self.user
      token = JsonWebToken.encode({
        user_forgot_password_id: user.id,
      }, 72.hours.from_now)
      if Rails.env.to_s == 'test'
        UserMailer.forgot_password(user.id, token).deliver_now
      else
        UserMailer.forgot_password(user.id, token).deliver_later
      end
      return token
    end
    errors.add(:forgot_password, 'Email cannot be found')
    return nil
  end
  # immutable state
  def user
    @user = @user || User.find_by_email(@email)
  end
end
