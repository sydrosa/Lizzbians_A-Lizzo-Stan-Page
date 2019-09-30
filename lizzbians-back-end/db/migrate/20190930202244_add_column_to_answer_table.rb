class AddColumnToAnswerTable < ActiveRecord::Migration[6.0]
  def change
    add_column :answers, :is_correct, :boolean
  end
end
