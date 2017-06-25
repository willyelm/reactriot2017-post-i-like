ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  address: 'smtp.gmail.com',
  port: 587,
  domain: 'gmail.com',
  user_name: 'uraniumota.team@gmail.com',
  password: 'hoilamgi!@#',
  authentication: 'plain',
  enable_starttls_auto: true
}
