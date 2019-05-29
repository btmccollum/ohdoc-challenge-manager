class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :github_username, :github_repo_path, :github_repo_url, :twitter_username, :email

  attribute :github_linked do |object|
    !!object.encrypted_github_token
  end

  attribute :twitter_linked do |object|
    !!object.encrypted_twitter_token
  end

  has_many :submissions
end
