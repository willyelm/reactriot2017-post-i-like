class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :categories
  has_many :posts, through: :categories

  def full_name
    (first_name || '') + ' ' + (last_name || '')
  end

  def send_confirmation_instructions; end
end
