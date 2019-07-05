require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "password_reset" do
    let(:user) { User.create(email: "testing1@test.com", password: "123456", password_confirmation: "123456") }
    let(:mail) { UserMailer.password_reset(user) }

    it "renders the headers" do
      expect(mail.subject).to eq("Password Reset")
      expect(mail.to).to eq([user.email])
      expect(mail.from).to eq(["noreply@ohdocmanager.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to include("To reset your password click the link below:\r\n\r\n")
    end
  end
end
