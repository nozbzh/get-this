class RemoveForeignKeysFromItems < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :items, :restaurants
  end
end
