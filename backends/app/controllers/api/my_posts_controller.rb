module Api
  # Only for functions after login
  class MyPostsController < PrivateController
    def index # show all my posts
      render json: {
        posts: @current_user.posts
      }
    end

    def show # show my post
      render json: {
        post: @current_user.posts.find_by_id(params[:id])
      }
    end

    def update # update my post
      post = Post.find_by_id(params[:id])
      if post.update_attributes(params[:posts])
        render json: {
          result: 'successful'
        }
      else
        render json: {
          result: 'failed'
        }, status: 422
      end
    end

    def destroy # destroy my post
      post = Post.find_by_id(params[:id])
      if post.destroy
        render json: {
          result: 'successful'
        }
      else
        render json: {
          result: 'failed'
        }, status: 422
      end
    end
  end
end
