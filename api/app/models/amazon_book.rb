class AmazonBook < ApplicationRecord
  attr_accessor :title, :image_url, :url

  def initialize(title, image_url, url)
    @title = title
    @image_url = image_url
    @url = url
  end
end
