class PostItem < ApplicationRecord
  belongs_to :post

  validates: content, presence: true
end
