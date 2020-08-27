class Api::V1::PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :author, :image, :status, :created_at, :updated_at
  belongs_to :user
  has_many :post_items
end
