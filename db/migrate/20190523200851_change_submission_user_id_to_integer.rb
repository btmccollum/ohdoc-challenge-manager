class ChangeSubmissionUserIdToInteger < ActiveRecord::Migration[6.0]
  def change
    change_column :submissions, :user_id, 'integer USING CAST(user_id AS integer)'
  end
end
