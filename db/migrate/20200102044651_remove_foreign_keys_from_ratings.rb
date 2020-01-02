class RemoveForeignKeysFromRatings < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :ratings, :items
    remove_foreign_key :ratings, :users
    remove_foreign_key :ratings, :restaurants
  end
end
