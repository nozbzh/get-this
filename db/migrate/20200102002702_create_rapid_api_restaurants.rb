class CreateRapidApiRestaurants < ActiveRecord::Migration[6.0]
  def change
    create_table :rapid_api_restaurants do |t|
      t.string :name
      t.integer :rapid_api_id
      t.string :full_address
      t.string :street
      t.string :city
      t.string :state
      t.string :postal_code
      t.string :phone
      t.float :latitude
      t.float :longitude

      t.index :rapid_api_id
      t.index :city
      t.index :postal_code

      t.timestamps
    end
  end
end
