class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[github twitter]

  # used to handle encryption upon persistance
  attr_encrypted_options.merge!(encode: true, encode_iv: true, encode_salt: true)
  attr_encrypted :twitter_token, key: ENV['TKEY']
  attr_encrypted :twitter_token_secret, key: ENV['TKEY']
  attr_encrypted :github_token, key: ENV['GKEY']

  # validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, on: :create
  validates :password, confirmation: true, on: :create

  has_many :submissions

  # creating jwt token for auth purposes to be passed between rails and react
  def generate_jwt
    jwt = TokenAuth.encrypt({id: self.id})
    return jwt
  end

  def generate_state_token
    self.state_token = Sysrandom.urlsafe_base64(32)
    self.save
    return self.state_token
  end

  def update_from_omniauth(auth)
    binding.pry
    self.provider = auth.provider
    self.uid = auth.id
    self.github_token = auth.credentials.token
  end
end
