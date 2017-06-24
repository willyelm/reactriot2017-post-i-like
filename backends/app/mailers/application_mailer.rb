class ApplicationMailer < ActionMailer::Base
  default from: APP_CONFIG[:email_sender]
  #layout 'mailer'
end
