FactoryBot.define do
  factory :post do
    title { Faker::Lorem.word }
    url { Faker::Internet.url(host: "books.google.com") }
    author { Faker::Name.name }
    image { "https://books.google.com/books/content?id=k-IeBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" }
    user
    status { "registered" }

    after(:build) do |post|
      3.times do
        post.post_items << build(:post_item, post: post)
      end
    end
  end
end
