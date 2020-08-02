Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, ENV["TWITTER_API_KEY"], ENV["TWITTER_API_KEY_SECRET"], callback_url: "http://127.0.0.1/api/v1/auth/twitter/callback"
end
