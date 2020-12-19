require "rails_helper"

RSpec.describe "Api::V1::Share::Posts", type: :request do
  describe "GET api/v1/share/posts" do
    subject { get(api_v1_share_posts_path) }

    context "Posts が存在する場合" do
      before do
        create_list(:post, 5)
      end

      it "正常に取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.length).to eq 5
        expect(res[0].keys).to eq ["id", "title", "url", "author", "image"]
        expect(response).to have_http_status(:ok)
      end
    end

    context "Posts が存在しない場合" do
      it "空のオブジェクトが返される" do
        subject
        res = JSON.parse(response.body)
        expect(res).to be_empty
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET api/v1/share/post/:id" do
    subject { get(api_v1_share_post_path(post_id)) }

    let(:post) { create(:post) }

    context "指定した id の post が存在する場合" do
      let(:post_id) { post.id }

      it "post の中身を取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "title", "url", "author", "image"]
        expect(response).to have_http_status(:ok)
      end
    end

    context "指定した id の post が存在しない場合" do
      let(:post_id) { 1_000_000 }

      it "post が見つからない" do
        expect { subject }.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end
end
