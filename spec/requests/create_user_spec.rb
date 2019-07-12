require 'rails_helper'

describe "create users route", :type => :request do
  before do
    post '/api/v1/users', params: { :user => { :email => 'testaccount01@test.com', :password => '123456', :password_confirmation => '123456'}}
    @json_data = JSON.parse(response.body)
    @user_attributes = @json_data['user']['data']['attributes']
  end
  
  it 'successfully creates a user when valid params are passed' do
    expect(@json_data['user']['data']['id'].to_i).to be >= 1
  end
  
  it 'returns a user with an attributes collection' do
    expect(@json_data['user']['data']['attributes'].keys).to eq(['github_username', 'github_repo_path', 'github_repo_url', 'twitter_username', 'email', 'github_linked', 'twitter_linked'])
  end
  
  it 'generates a valid JWT token for the user' do
    expect { JWT.decode(@json_data['jwt'], ENV['JWT_SECRET']) }.to_not raise_error(JWT::DecodeError)
  end

  it 'JWT token contains the user ID' do
    user_id = @json_data['user']['data']['id'].to_i
    token_data = JWT.decode(@json_data['jwt'], ENV['JWT_SECRET']) 
    expect(token_data[0]['id']).to eq(user_id)
  end

  it 'should not have a github_username, github_repo_path, and github_repo_url at instantiation' do
    expect(@user_attributes['github_username'] && @user_attributes['github_repo_path'] && @user_attributes['github_repo_url']).to be_nil
  end

  it 'should not have a valid github or twitter link at instantiation' do
    expect(@user_attributes['github_linked'] && @user_attributes['twitter_linked'] ).to eq(false)
  end
end