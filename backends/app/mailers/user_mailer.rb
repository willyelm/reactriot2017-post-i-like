class UserMailer < ApplicationMailer
  def register_user(user_id, token)
    @user = User.find_by_id(user_id)
    @url = APP_CONFIG[:protocol] +
      '://' + APP_CONFIG[:front_domain] +
      '/#verify_register_success/' + token.to_s
    mail(to: @user.email, subject: 'I Like Post Confirmation Email')
  end

  def forgot_password(user_id, token)
    @user = User.find_by_id(user_id)
    @url  = APP_CONFIG[:protocol] +
      '://' + APP_CONFIG[:front_domain] +
      '/#reset_password/' + token.to_s
    mail(to: @user.email, subject: 'Reset your I Like Post password')
  end
end
