class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # used to handle encryption upon persistance
  attr_encrypted_options.merge!(encode: true, encode_iv: true, encode_salt: true)
  attr_encrypted :encrypted_twitter_token, key: ENV["AEKEY"]
  attr_encrypted :encrypted_github_token_iv, key: ENV["AEKEY"]
  attr_encrypted :encrypted_twitter_token, key: ENV["AEKEY"]
  attr_encrypted :encrypted_github_token_iv, key: ENV["AEKEY"]

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, on: :create
  validates :password, confirmation: true, on: :create
end
