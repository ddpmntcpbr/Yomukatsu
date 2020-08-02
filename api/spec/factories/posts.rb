FactoryBot.define do
  factory :post do
    title { Faker::Lorem.word }
    url { Faker::Internet.url(host: "amazon.co.jp") }
    image { Faker::Internet.url(host: "m.media-amazon.com/images") }
    user
    status { "reading" }

    trait :complete do
      status { "complete" }
    end
  end
end
