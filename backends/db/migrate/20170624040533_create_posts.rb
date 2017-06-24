# Posts
class CreatePosts < ActiveRecord::Migration[5.0]
  def up
    create_table :posts do |t|
      t.string :title
      t.string :description
      t.text :content
      t.integer :shared_type
      t.integer :category_id
      t.string :url

      t.timestamps
    end
  end

  def down
    drop_table :posts
  end
end
