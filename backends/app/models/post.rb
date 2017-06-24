class Post < ApplicationRecord
  belongs_to :category, counter_cache: true

  enum shared_type: [
    :only_me,
    :logged_in,
    :everyone
  ]

  def as_json
    {
      id: id,
      title: title,
      content: content,
      url: url || category.user.full_name,
      created_at: created_at.strftime("%B %d, %Y"),
      updated_at: updated_at.strftime("%B %d, %Y"),
      author: category.user.full_name
    }
  end

end
