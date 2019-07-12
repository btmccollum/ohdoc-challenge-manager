require 'rails_helper'

describe 'JWT creation for User' do
  describe '#generate_jwt' do
    before do
      @user = User.create(email: 'test01@test.com', 
                          password: '123456', 
                          password_confirmation: '123456')
    end

    it 'should convert a user\'s id into a properly formed JSON web token' do
      expect(@user.generate_jwt).not_to be_nil
    end

    it 'should contain the user\'s id and be a match when decrypted' do 
      token = @user.generate_jwt
      decoded_info = TokenAuth.decode(token)
      expect(decoded_info['id']).to eql(@user.id)
    end
  end
end
