class ChangeUsernameColumnName < ActiveRecord::Migration[6.0]
  def change
    change_table :users do |t|
      t.rename :username, :twitter_username
    end
  end
end
