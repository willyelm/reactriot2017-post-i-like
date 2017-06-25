# Model Category
class Category < ApplicationRecord
  has_many :posts
  belongs_to :user

  def as_json(_opts = {})
    {
      id: id,
      name: name
    }
  end
end
