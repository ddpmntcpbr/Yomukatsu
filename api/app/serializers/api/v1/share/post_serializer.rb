class Api::V1::Share::PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :author, :image, :twitter_card_image
end
