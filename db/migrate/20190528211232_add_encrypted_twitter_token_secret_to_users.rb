class AddEncryptedTwitterTokenSecretToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :encrypted_twitter_token_secret, :string
    add_column :users, :encrypted_twitter_token_secret_iv, :string
  end
end
