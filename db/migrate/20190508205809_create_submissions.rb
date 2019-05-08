class CreateSubmissions < ActiveRecord::Migration[6.0]
  def change
    create_table :submissions do |t|
      t.string :user_id, null: false
      t.boolean :twitter, default: false
      t.boolean :github, default: false
      t.string :title, default: ""
      t.text :content, default: ""
      t.timestamps
    end
  end
end
