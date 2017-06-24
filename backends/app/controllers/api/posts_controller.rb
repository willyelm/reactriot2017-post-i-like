# Post
module Api
  class PostsController < BaseController
    def index
      user = User.find_by(token: params[:token])
      if user
        source = open(params['url']).read
        res = Readability::Document.new(source,:tags=>%w[div pre p h1 h2 h3 h4 td table tr b a img br li ul ol center br hr blockquote em strong sub sup font tbody tt span dl dd t code figure fieldset legend dir noscript textarea iframe], :attributes => %w[href src align width color height style], :remove_empty_nodes=>false,:clean_conditionally=>true,:weight_classes=>true,:remove_unlikely_candidates=>true)

        title = res.title
        content = res.content
        default_category = user.categories.find_by_name('General')
        default_category.posts.create(
          title: title, content: content, shared_type: :everyone
        )
      end
    end

    def create
      open(params['url']).read
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
end
