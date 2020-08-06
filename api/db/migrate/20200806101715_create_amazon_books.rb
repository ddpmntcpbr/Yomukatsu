class CreateAmazonBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :amazon_books do |t|

      t.timestamps
    end
  end
end
