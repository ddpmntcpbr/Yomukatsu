require "rails_helper"

RSpec.describe "Api::V1::UsersCounts", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/users_count"
      expect(response).to have_http_status(:success)
    end
  end
end
