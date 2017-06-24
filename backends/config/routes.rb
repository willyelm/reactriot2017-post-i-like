Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  namespace :api do
    # post '/post_token_to_charge', to: 'posts#create'
    resources :posts do
      collection do
        get :public_posts
      end
    end

    # User
    post '/login', controller: 'users', action: 'create'
    post '/register_user', controller: 'users', action: 'register_user'

    # Session
    post '/reset_password', controller: 'sessions', action: 'reset_password'
    post '/change_password', controller: 'users', action: 'change_password'
    post '/check_register_token', controller: 'sessions',
                                  action: 'check_register_token'
    post '/forgot_password', controller: 'sessions', action: 'forgot_password'
  end
end
