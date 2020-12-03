class Post < ApplicationRecord
  belongs_to :user
  has_many :post_items, dependent: :destroy
  accepts_nested_attributes_for :post_items, reject_if: :reject_blank, allow_destroy: true

  validates :title, presence: true
  enum status: { reading: "reading", registered: "registered", completed: "completed" }
  validate :up_to_one_reading_status_post_per_user, on: :create

  private

    def up_to_one_reading_status_post_per_user
      if self.status == "reading" && Post.where(user: self.user).where(status: "reading").count > 0
        errors.add(:post,"Current user already has reading status post")
      end
    end

  def reject_blank(attributes)
    if attributes[:id]
      attributes.merge!(_destroy: true) if attributes[:content].blank?
      !attributes[:content].blank?
    else
      attributes[:content].blank?
    end
  end
end
