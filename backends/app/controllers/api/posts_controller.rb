class Api::PostsController < ActionController::Base

  def index
    user = User.find_by(token: params[:token])
    if user
      source = open(params['url']).read
      title = Readability::Document.new(source).title
      content = Readability::Document.new(source).content
      p title
      p '----'
      p content
      default_category = user.categories.find_by_name('General')
      default_category.posts.create(title: title, content: content, shared_type: :everyone)
    end
  end

  def create
    p params
    source = open(params['url']).read
    puts Readability::Document.new(source).title
    p '----------------------------------------------------'
    puts Readability::Document.new(source).content
  end

  def show
    user = User.find_by(token: params[:token])
    if user
      post = Post.find(params[:id])
      if post.present?
        render json: {
          result: :ok,
          post: post
        }
      else
        render json: {
          errors: 'No data available'
        }, status: 422
      end
    end
  end

  def public_posts
    posts = Post.where(shared_type: :everyone)
    if posts.length.positive?
      render json: {
        result: :ok,
        posts: posts
      }
    else
      render json: {
        errors: 'No data available'
      }, status: 422
    end
  end

end
