class AuthenticationUser
  prepend SimpleCommand

  def initialize(agr1, agr2)
    if agr1.class.name == 'User'
      @user = user
    else
      @email = agr1
      @password = agr2
    end
  end

  def successful_login_response
    token =
      JsonWebToken.encode({ user_login_id: @user.id }, 72.hours.from_now)
    @user.last_sign_in_at = @user.current_sign_in_at
    @user.current_sign_in_at = Time.now.utc
    @user.sign_in_count += 1

    result = {}
    result = { token: token, user: @user.as_json } if @user.save
    result
  end

  def call
    @user ||= User.find_by_email(@email)
    result = nil

    unless @user.present?
      errors.add(:authentication, 'invalid credentials')
      return nil
    end

    if @user.confirmed_at?
      if @user.valid_password?(@password)
        result = successful_login_response
      else
        errors.add(:authentication, 'invalid credentials')
      end
    else
      errors.add(
        :authentication,
        'Please verify your email address before signing in again. Thank you.'
      )
    end
    result
  end
end
