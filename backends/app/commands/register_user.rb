class RegisterUser
  prepend SimpleCommand

  def initialize(opts = {})
    @first_name = opts[:first_name]
    @last_name = opts[:last_name]
    @email = opts[:email]
    @password = opts[:password]
    @password_confirmation = opts[:password_confirmation]
  end

  def user_object
    User.new(
      first_name: @first_name,
      last_name: @last_name,
      email: @email,
      password: @password,
      password_confirmation: @password_confirmation
    )
  end

  def call
    user = user_object
    if User.where(email: @email).present?
      errors.add(:register_user, 'Email already exists.')
      return nil
    end
    if user.save
      object_user_id = { user_registration_id: user.id }
      token = JsonWebToken.encode(object_user_id, 72.hours.from_now)
      if Rails.env.to_s == 'test'
        UserMailer.register_user(user.id, token).deliver_now
      else
        UserMailer.register_user(user.id, token).deliver_later
      end
      return true
    else
      if user.errors.messages[:email]
        user.errors.messages[:email] = ['Work email is missing']
      end
      errors.add(:register_user, user.errors.to_a)
      return nil
    end
    errors.add(:register_user, 'Registration infomation is not correct.')
    return nil
  end
end
