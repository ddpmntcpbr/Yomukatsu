require "rails_helper"

RSpec.describe PostItem, type: :model do
  context "入力値が適切な場合" do
    let(:post_item) { build(:post_item) }

    it "新規作成できる" do
      expect(post_item.valid?).to eq true
    end
  end

  context "content が指定されていない場合" do
    let(:post_item) { build(:post_item, content: nil) }

    it "エラーする" do
      post_item.valid?
      expect(post_item.errors.messages[:content]).to include "can't be blank"
    end
  end
end