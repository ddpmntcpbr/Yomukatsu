class Post < ApplicationRecord
  belongs_to :user
  has_many :post_items, dependent: :destroy

  validates :title, presence: true

  enum status: { reading: "reading", complete: "complete" }
end
