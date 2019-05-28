class AddStateVerifyToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :state_token_verify, :string
  end
end
