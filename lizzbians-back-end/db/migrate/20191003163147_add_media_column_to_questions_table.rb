class AddMediaColumnToQuestionsTable < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :media, :string
  end
end
