class Post < ApplicationRecord
  belongs_to :user
  has_many :post_items, dependent: :destroy
  accepts_nested_attributes_for :post_items, reject_if: :reject_blank, allow_destroy: true

  validates :post_items, length: { minimum: 1 }
  validates :title, presence: true
  enum status: { reading: "reading", completed: "completed" }

  def reject_blank(attributes)
    if attributes[:id]
      attributes.merge!(_destroy: true) if attributes[:content].blank?
      !attributes[:content].blank?
    else
      attributes[:content].blank?
    end
  end
end
