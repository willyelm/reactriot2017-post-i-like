# Categories
class CreateCategories < ActiveRecord::Migration[5.0]
  def up
    create_table :categories do |t|
      t.string :name
      t.integer :user_id
      t.integer :posts_count

      t.timestamps
    end
  end

  def down
    drop_table :categories
  end
end
