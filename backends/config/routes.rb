Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  namespace :api do
    # post '/post_token_to_charge', to: 'posts#create'
    resources :posts do
      collection do
        get :public_posts
      end
    end
  end
end
