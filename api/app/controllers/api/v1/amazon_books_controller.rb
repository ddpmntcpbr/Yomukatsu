class Api::V1::AmazonBooksController < ApplicationController
  def search
    # AmazonAPIでの検索結果を渡したパーシャルファイルを返す
    amazon_books = search_by_amazon(params[:keyword])
    render json: amazon_books
  end

  private
    def search_by_amazon(keyword)
      request = Vacuum.new(marketplace: 'JP',
        access_key: ENV['AMAZON_API_ACCESS_KEY'],
        secret_key: ENV['AMAZON_API_SECRET_KEY'],
        partner_tag: ENV['ASSOCIATE_TAG'])
      response = request.search_items(keywords: keyword,
                      search_index: 'Books',
                      resources: ['ItemInfo.Title', 'Images.Primary.Large']).to_h


      # 検索結果から本のタイトル,画像URL, 詳細ページURLの取得して配列へ格納
      amazon_books = []
      items.each do |item|
      amazon_book = {
        title: item.dig('ItemInfo', 'Title', 'DisplayValue'),
        image: item.dig('Images', 'Primary', 'Large', 'URL'),
        url: item.dig('DetailPageURL')
      }
      amazon_books << amazon_book
    end
    amazon_books
    end
end
