require "rails_helper"

RSpec.describe "Api::V1::Posts", type: :request do
  describe "GET api/v1/posts::id" do
    subject { get(api_v1_post_path(post_id), headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:post) { create(:post, user: current_user) }
    let(:post_id) { post.id }

    context "post 作成者自身がアクセスする場合" do
      it "post の中身を取得できる" do
        subject
        expect(Post.count).to eq 1
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "title", "url", "image", "status", "user_id", "created_at", "updated_at"]
        expect(response).to have_http_status(:ok)
      end
    end

    context "post 作成者以外がアクセスする場合" do
      let(:headers) { other_user.create_new_auth_token }
      let(:other_user) { create(:user) }

      it "post の中身を取得できない" do
        subject
        expect(response).to have_http_status(404)
      end
    end

    context "指定した id の post が存在しない場合" do
      let(:post_id) { 1_000_000 }

      it "post が見つからない" do
        subject
        expect(response).to have_http_status(404)
      end
    end
  end

  describe "POST api/v1/posts" do
    subject { post(api_v1_posts_path, params: params, headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    context "正しく post を作成した場合" do
      let(:params) { { post: attributes_for(:post) } }

      it "post レコードが保存される" do
        expect { subject }.to change { current_user.posts.count }.by(1)
        res = JSON.parse(response.body)
        expect(res["title"]).to eq params[:post][:title]
        expect(res["url"]).to eq params[:post][:url]
        expect(res["image"]).to eq params[:post][:image]
        expect(res["status"]).to eq "reading"
        expect(res["user_id"]).to eq current_user.id
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
