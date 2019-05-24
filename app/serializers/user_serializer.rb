class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :email

  attribute :github_linked do |object|
    !!object.encrypted_github_token
  end

  attribute :twitter_linked do |object|
    !!object.encrypted_twitter_token
  end

  has_many :submissions
end
