class AddGithubFieldsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :github_repo_path, :string
    add_column :users, :github_repo_url, :string
  end
end
