require 'rails_helper'

describe "DELETE /api/v1/users/:user_id", :type => :request do
  before do
    test_user = User.create(email: "test01@test.com", password: "123456", password_confirmation: "123456")
    jwt = test_user.generate_jwt
    delete "/api/v1/users/#{test_user.id}", headers: { 'Authorization': "Token #{jwt}" }
  end

  it 'returns a 202 upon success' do
    expect(response.status).to eq(202)
  end
end