class AddAuthTokensUsernameToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :username, :string
    add_column :users, :encrypted_twitter_token, :string
    add_column :users, :encrypted_twitter_token_iv, :string
    add_column :users, :encrypted_github_token, :string
    add_column :users, :encrypted_github_token_iv, :string 
  end
end
