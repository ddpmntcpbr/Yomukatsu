class Post < ApplicationRecord
  belongs_to :user
  has_many :post_items, dependent: :destroy
  accepts_nested_attributes_for :post_items

  validates :post_items, length: { minimum: 1 }
  validates :title, presence: true
  enum status: { reading: "reading", complete: "complete" }
end
