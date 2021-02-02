class AddTwitterCardImageToPost < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :twitter_card_image, :string
  end
end
