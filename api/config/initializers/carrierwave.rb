require "carrierwave/storage/abstract"
require "carrierwave/storage/file"
require "carrierwave/storage/fog"

# unless Rails.env.development? || Rails.env.test?
CarrierWave.configure do |config|
  config.storage :fog
  config.fog_provider = "fog/aws"
  config.fog_directory = ENV["AWS_S3_BUCKET_NAME"]
  config.asset_host = "https://" + ENV["AWS_S3_BUCKET_NAME"] + ".s3-ap-northeast-1.amazonaws.com"
  config.fog_credentials = {
    provider: "AWS",
    aws_access_key_id: ENV["AWS_S3_ACCESS_KEY_ID"],
    aws_secret_access_key: ENV["AWS_S3_SECRET_ACCESS_KEY"],
    region: "ap-northeast-1",
    path_style: true,
  }

  # config.fog_public     = true
  # config.fog_attributes = { 'Cache-Control' => "max-age=#{365.day.to_i}" }
  # config.asset_host = ENV['AWS_S3_BUCKET_URL']

  # case Rails.env
  #   when 'production'
  #     config.fog_directory = ENV['AWS_S3_BUCKET_NAME'] + '-image-store'
  #     config.asset_host = 'https://' + ENV['AWS_S3_BUCKET_NAME'] + '-image-store.s3-ap-northeast-1.amazonaws.com'

  #   when 'development'
  #     config.fog_directory = 'dev-' + ENV['AWS_S3_BUCKET_NAME'] +'-image-store'
  #     config.asset_host = 'https://dev-' + ENV['AWS_S3_BUCKET_NAME'] + '-image-store.s3-ap-northeast-1.amazonaws.com'

  #   when 'test'
  #     config.fog_directory = 'dev-' + ENV['AWS_S3_BUCKET_NAME'] + '-image-store'
  #     config.asset_host = 'https://dev-' + ENV['AWS_S3_BUCKET_NAME'] + '-image-store.s3-ap-northeast-1.amazonaws.com'
  # end
end
# end

# CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/
