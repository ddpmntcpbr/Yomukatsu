require "rails_helper"

RSpec.describe Post, type: :model do
  context "入力値が適切な場合" do
    let(:post) { build(:post) }

    it "新規作成できる" do
      expect(post.valid?).to eq true
    end
  end

  context "title が指定されていない場合" do
    let(:post) { build(:post, title: nil) }

    it "エラーする" do
      post.valid?
      expect(post.errors.messages[:title]).to include "can't be blank"
    end
  end

  context "status が reading であるカラムを2個以上登録する場合" do
    let!(:current_user) { create(:user) }
    let!(:post) { create(:post, status: "reading", user: current_user) }

    it "エラーする" do
      second_reading_status_post = build(:post, status: "reading", user: current_user)
      second_reading_status_post.valid?
      expect(second_reading_status_post.errors[:post]).to include "Current user already has reading status post"
    end
  end
end
