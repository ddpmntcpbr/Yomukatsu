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
        expect(res.keys).to eq ["id", "title", "url", "image", "status", "created_at", "updated_at", "user", "post_items"]
        expect(response).to have_http_status(:ok)
      end
    end

    context "post 作成者以外がアクセスする場合" do
      let(:headers) { other_user.create_new_auth_token }
      let(:other_user) { create(:user) }

      it "post の中身を取得できない" do
        subject
        expect(response).to have_http_status(:not_found)
      end
    end

    context "指定した id の post が存在しない場合" do
      let(:post_id) { 1_000_000 }

      it "post が見つからない" do
        subject
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "POST api/v1/posts" do
    subject { post(api_v1_posts_path, params: @params, headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    context "正しく post を作成した場合" do
      before do
        @params = { post: attributes_for(:post) }
        @params[:post][:post_items_attributes] = [attributes_for(:post_item), attributes_for(:post_item), attributes_for(:post_item)]
      end

      it "post レコードが保存される" do
        expect { subject }.to change { current_user.posts.count }.by(1)
        res = JSON.parse(response.body)
        expect(res["title"]).to eq @params[:post][:title]
        expect(res["url"]).to eq @params[:post][:url]
        expect(res["image"]).to eq @params[:post][:image]
        expect(res["status"]).to eq "reading"
        expect(res["post_items"].length).to eq 3
        expect(res["post_items"].first["content"]).to eq @params[:post][:post_items_attributes].first[:content]
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "PATCH api/v1/posts" do
    subject { patch(api_v1_post_path(@post.id), params: @params, headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    # context "正しく post を作成した場合" do
    #   before do
    #     @post = create(:post, user: current_user)
    #     @params = { post: { title: Faker::Lorem.word, url: Faker::Internet.url, image: Faker::Internet.url, status: "complete", created_at: Time.current } }
    #     @params[:post][:post_items_attributes] = [{ id: @post.post_items.first.id, content: @post.post_items.first.content },
    #                                               { id: @post.post_items.second.id, content: @post.post_items.second.content },
    #                                               { id: @post.post_items.third.id, content: "updated content." },
    #                                               attributes_for(:post_item)]

    #     # @params[:post][:post_items_attributes] = {  "0"=>{id:@post.post_items.first.id, content: @post.post_items.first.content},
    #     #                                             "1"=>{id:@post.post_items.second.id, content: @post.post_items.second.content},
    #     #                                             "2"=>{id:@post.post_items.third.id, content: "updated content." },
    #     #                                             "3"=>attributes_for(:post_item)}
    #   end

    #   it "post レコードが更新される" do
    #     expect { subject }.to change { @post.reload.title }.from(@post.title).to(@params[:post][:title]) &
    #                           change { @post.reload.url }.from(@post.url).to(@params[:post][:url]) &
    #                           change { @post.reload.image }.from(@post.image).to(@params[:post][:image]) &
    #                           change { @post.reload.status }.from(@post.status).to(@params[:post][:status]) &
    #                           not_change { @post.reload.created_at } &
    #                           change { @post.reload.post_items.count }.from(3).to(4) &
    #                           not_change { @post.reload.post_items.first.content } &
    #                           not_change { @post.reload.post_items.second.content }
    #     change {@post.reload.post_items.third.content}.from(@post.post_items.third.content).to(@params[:post][:post_items_attributes].third[:content])
    #     expect(response).to have_http_status(:ok)
    #   end
    # end

    context "post_items を一部を削除して更新しようとした場合" do
      before do
        @post = create(:post, user: current_user)
        @params = { post: { title: Faker::Lorem.word, url: Faker::Internet.url, image: Faker::Internet.url, status: "complete", created_at: Time.current } }
        @params[:post][:post_items_attributes] = [{ id: @post.post_items.first.id, content: @post.post_items.first.content },
                                                  { id: @post.post_items.second.id, content: @post.post_items.second.content },
                                                  { id: @post.post_items.third.id, content: "" }]
      end

      it "更新できる" do
        expect { subject }.to change { @post.reload.post_items.count }.from(3).to(2)
        expect(response).to have_http_status(:ok)
      end
    end

    context "post_items を全て消して更新しようとした場合" do
      before do
        @post = create(:post, user: current_user)
        @params = { post: { title: Faker::Lorem.word, url: Faker::Internet.url, image: Faker::Internet.url, status: "complete", created_at: Time.current } }
        @params[:post][:post_items_attributes] = [{ id: @post.post_items.first.id, content: "" },
                                                  { id: @post.post_items.second.id, content: "" },
                                                  { id: @post.post_items.third.id, content: "" }]
      end

      it "バリデーションエラーにより更新できない" do
        subject
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context "post 作成者以外が更新しようとした場合" do
      before do
        @post = create(:post)
        @params = { post: { title: Faker::Lorem.word, url: Faker::Internet.url, image: Faker::Internet.url, status: "complete", created_at: Time.current } }
        @params[:post][:post_items_attributes] = [{ id: @post.post_items.first.id, content: @post.post_items.first.content },
                                                  { id: @post.post_items.second.id, content: @post.post_items.second.content },
                                                  { id: @post.post_items.third.id, content: "updated content." },
                                                  attributes_for(:post_item)]
      end

      it "更新できない" do
        subject
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "DELETE /api/v1/posts/:id" do
    subject { delete(api_v1_post_path(post.id), headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    before do
      allow_any_instance_of(Api::V1::ApiController).to receive(:current_user).and_return(current_user)
    end

    context "post の作者が自分自身の場合" do
      let!(:post) { create(:post, user: current_user) }

      it "削除できる" do
        expect { subject }.to change { current_user.posts.count }.by(-1)
        expect(response).to have_http_status(:ok)
      end
    end

    context "post の作者が他人の場合" do
      let!(:post) { create(:post) }

      it "削除できない" do
        subject
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
