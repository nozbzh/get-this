class CreateRatings < ActiveRecord::Migration[6.0]
  def change
    create_table :ratings do |t|
      t.integer :rating
      t.text :note

      t.references :item, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      # For convenience: to get all users who rated a restaurant and all restaurants rated by a user
      t.references :restaurant, index: true, foreign_key: true

      t.timestamps
    end
  end
end
