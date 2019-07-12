require 'rails_helper'

describe 'User OAuth tokens' do
  describe 'should be properly encrypted with the attr_encrypted gem' do
    before do
      @user = User.create(email: 'test01@test.com', 
                          password: '123456', 
                          password_confirmation: '123456')
    end

    it 'should save an OAuth token when persisted' do
      @user.github_token = 'aldfjaoeunfo2i3j2j2l3j'
      @user.save
      expect(@user.github_token).to eql('aldfjaoeunfo2i3j2j2l3j')
    end

    it 'should be properly encrypted' do
      @user.github_token = 'aldfjaoeunfo2i3j2j2l3j'
      @user.save
      expect(@user.encrypted_github_token).not_to be_nil
    end

    it 'should create an iv when the token is persisted' do
      @user.github_token = 'aldfjaoeunfo2i3j2j2l3j'
      @user.save
      expect(@user.encrypted_github_token_iv).not_to be_nil
    end
  end
end
