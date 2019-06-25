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

  # used for identifying a user is valid on third party api calls
  def generate_state_token
    self.state_token = Sysrandom.urlsafe_base64(32)
    self.save
    return self.state_token
  end

  def update_from_omniauth(auth)
    self.provider = auth.provider
    self.uid = auth.id
    self.github_token = auth.credentials.token
    self.github_username = auth.extra.raw_info.login
  end

  # used for password reset token
  def generate_password_token!
    self.reset_password_token = generate_token
    self.reset_password_sent_at = Time.now.utc
    save!
  end
  
  # a password reset token is valid for 1 hour 
  def password_token_valid?
    (self.reset_password_sent_at + 1.hours) > Time.now.utc
  end
  
  def reset_password!(password)
    self.reset_password_token = nil
    self.password = password
    save!
  end
  
  private
  
  def generate_token
    SecureRandom.hex(10)
  end
end
