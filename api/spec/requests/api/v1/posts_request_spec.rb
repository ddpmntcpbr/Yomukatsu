require "rails_helper"

RSpec.describe "Api::V1::Posts", type: :request do
  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/posts/show"
      expect(response).to have_http_status(:success)
    end
  end
end
