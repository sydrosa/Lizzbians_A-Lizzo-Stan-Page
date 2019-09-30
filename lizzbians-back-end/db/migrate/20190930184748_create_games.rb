class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :user_id
      t.string :game_type
      t.integer :score

      t.timestamps
    end
  end
end
