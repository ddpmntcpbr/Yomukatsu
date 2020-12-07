FactoryBot.define do
  factory :post do
    title { Faker::Lorem.word }
    url { Faker::Internet.url(host: "amazon.co.jp") }
    author { Faker::Name.name }
    image { Faker::Internet.url(host: "m.media-amazon.com/images") }
    user
    status { "registered" }

    after(:build) do |post|
      3.times do
        post.post_items << build(:post_item, post: post)
      end
    end
  end
end
