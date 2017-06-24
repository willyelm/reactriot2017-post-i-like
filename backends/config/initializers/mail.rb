if Rails.env != 'test'
  if ['staging', 'development'].index(Rails.env.to_s)
    ActionMailer::Base.delivery_method = :smtp
    ActionMailer::Base.smtp_settings = {
      :address => "smtp.gmail.com",
      :port => 587,
      :domain => "gmail.com",
      :user_name => "jameshuynh1985@gmail.com",
      :password => "thepa55w0rd",
      :authentication => "plain",
      :enable_starttls_auto => true
    }
  else
    ActionMailer::Base.smtp_settings = {
      :address => "smtp.sendgrid.net",
      :port => 587,
      :domain => ENV['SENDGRID_DOMAIN_NAME'],
      :enable_starttls_auto => true,
      :authentication => "plain",
      :user_name => ENV['SENDGRID_USERNAME'],
      :password => ENV['SENDGRID_PASSWORD'],
    }
    ActionMailer::Base.delivery_method = :smtp
    ActionMailer::Base.default charset: "utf-8"
  end
end
