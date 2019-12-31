class AddFieldsToRestaurants < ActiveRecord::Migration[6.0]
  def change
    add_column :restaurants, :open_table_id, :int
    add_column :restaurants, :address, :string
    add_column :restaurants, :city, :string
    add_column :restaurants, :state, :string
    add_column :restaurants, :postal_code, :string
    add_column :restaurants, :country, :string
    add_column :restaurants, :phone, :string
    add_column :restaurants, :latitude, :float
    add_column :restaurants, :longitude, :float
    add_column :restaurants, :open_table_image_url, :string

    add_index :restaurants, :open_table_id
    add_index :restaurants, :city
    add_index :restaurants, :postal_code
  end
end
