class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.references :restaurant, index: true, foreign_key: true

      t.timestamps
    end
  end
end
