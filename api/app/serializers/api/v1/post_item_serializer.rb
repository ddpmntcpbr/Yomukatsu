class Api::V1::PostItemSerializer < ActiveModel::Serializer
  attributes :id, :content
  belongs_to :post
end
