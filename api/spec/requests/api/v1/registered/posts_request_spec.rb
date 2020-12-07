require "rails_helper"

RSpec.describe "Api::V1::Registered::Posts", type: :request do
  describe "GET api/v1/registered/posts" do
    subject { get(api_v1_registered_posts_path, headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    context "registered posts が存在する場合" do
      before do
        create_list(:post, 1, user: current_user, status: "reading")
        create_list(:post, 2, user: current_user, status: "registered")
        create_list(:post, 3, user: current_user, status: "completed")
      end

      it "自身が作成した registered posts を取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.length).to eq 2
        expect(res[0].keys).to eq ["id", "title", "url", "author", "image", "status", "created_at", "updated_at", "user", "post_items"]
        expect(res[0]["status"]).to eq "registered"
        expect(response).to have_http_status(:ok)
      end
    end

    context "registered posts が存在しない場合" do
      before do
        create_list(:post, 1, user: current_user, status: "reading")
        create_list(:post, 3, user: current_user, status: "completed")
      end

      it "空のオブジェクトが返される" do
        subject
        res = JSON.parse(response.body)
        expect(res).to be_empty
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET api/v1/registered/post/:id" do
    subject { get(api_v1_registered_post_path(post_id), headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:post) { create(:post, user: current_user, status: "registered") }
    let(:post_id) { post.id }

    context "post 作成者自身がアクセスする場合" do
      it "post の中身を取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "title", "url", "author", "image", "status", "created_at", "updated_at", "user", "post_items"]
        expect(response).to have_http_status(:ok)
      end
    end

    context "post 作成者以外がアクセスする場合" do
      let(:headers) { other_user.create_new_auth_token }
      let(:other_user) { create(:user) }

      it "post の中身を取得できない" do
        expect { subject }.to raise_error ActiveRecord::RecordNotFound
      end
    end

    context "指定した id の post が存在しない場合" do
      let(:post_id) { 1_000_000 }

      it "post が見つからない" do
        expect { subject }.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end

  describe "GET api/v1/registered/change_status_from_reading_to_registered" do
    subject { get(api_v1_registered_path(registered_post_id), headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    context "reading post が存在する場合" do
      let(:registered_post) { create(:post, user: current_user, status: "registered") }
      let!(:registered_post_id) { registered_post.id }
      let(:reading_post) { create(:post, user: current_user, status: "reading") }
      let!(:reading_post_id) { reading_post.id }

      it "reading post と registered post の status が交換される" do
        subject
        res = JSON.parse(response.body)
        expect(current_user.posts.reading.count).to eq 1
        expect(current_user.posts.registered.count).to eq 1
        expect(current_user.posts.find(reading_post_id).status).to eq "registered"
        expect(current_user.posts.find(registered_post_id).status).to eq "reading"
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
