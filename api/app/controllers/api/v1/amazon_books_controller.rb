class Api::V1::AmazonBooksController < ApplicationController
  def search
    if params[:keyword].present?
      #デバックログ出力するために記述
      Amazon::Ecs.debug = true

      # Amazon::Ecs::Responceオブジェクトの取得
      amazon_books = Amazon::Ecs.item_search(
        params[:keyword],
        search_index:  'Books',
        dataType: 'script',
        response_group: 'ItemAttributes, Images',
        country:  'jp',
        power: "Not kindle"
      )

      # 本のタイトル,画像URL, 詳細ページURLの取得
      @amazon_books = []
      amazon_books.items.each do |item|
        amazon_book = AmazonBook.new(
          item.get('ItemAttributes/Title'),
          item.get('LargeImage/URL'),
          item.get('DetailPageURL'),
        )
        @amazon_books << amazon_book
      end
    end
  end
end
