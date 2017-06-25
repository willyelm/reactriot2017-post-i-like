module Api
  # Only for functions after login
  class CategoriesController < PrivateController
    def create
      category = @current_user.categories.new(category_params)
      if category.save
        render json: {
          result: 'successful',
          categories: @current_user.categories,
          current_category_id: category.id
        }
      else
        render json: {
          result: 'failed'
        }, status: 422
      end
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

    private

    def category_params
      params.require(:category).permit(
        :name,
        :user_id
      )
    end
  end
end
