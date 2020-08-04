class PostItem < ApplicationRecord
  belongs_to :post, optional: true

  validates :content, presence: true
end
