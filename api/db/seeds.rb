ActiveRecord::Base.transaction do
  # ゲストユーザー
  name = "ゲストユーザー"
  nickname = "guest_user"
  image = "https://free-designer.net/design_img/0216053006.jpg"
  email = "guest@example.com"
  password = ENV["GUEST_USER_SIGNIN_PASSWORD"]
  User.create!(
    name: name,
    nickname: nickname,
    image: image,
    email: email,
    password: password,
  )
end