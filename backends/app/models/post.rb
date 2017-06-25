# Model Post
class Post < ApplicationRecord
  belongs_to :category, counter_cache: true

  enum shared_type: %I[only_me logged_in everyone]

  def as_json(_opts = {})
    {
      id: id,
      title: title,
      content: content,
      category_id: category_id,
      category_name: category.name,
      url: url || category.user.full_name,
      created_at: created_at.strftime('%B %d, %Y'),
      updated_at: updated_at.strftime('%B %d, %Y'),
      author: category.user.full_name
    }
  end
end
