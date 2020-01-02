class AddFieldsToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :description, :string
    add_column :items, :rapid_api_id, :integer
    add_column :items, :rapid_api_restaurant_id, :integer
    add_column :items, :price, :float

    add_index :items, :rapid_api_restaurant_id
  end
end
