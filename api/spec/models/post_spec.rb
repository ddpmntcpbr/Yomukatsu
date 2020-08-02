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
end
