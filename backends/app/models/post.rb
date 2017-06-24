class Post < ApplicationRecord
  belongs_to :category, counter_cache: true

  enum shared_type: [
    :only_me,
    :logged_in,
    :everyone
  ]
end
