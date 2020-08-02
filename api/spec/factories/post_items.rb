FactoryBot.define do
  factory :post_item do
    content { Faker::Lorem.paragraph }
    post
  end
end
