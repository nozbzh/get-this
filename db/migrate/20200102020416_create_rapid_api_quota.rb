class CreateRapidApiQuota < ActiveRecord::Migration[6.0]
  def change
    create_table :rapid_api_quota do |t|
      t.integer :requests_remaining

      t.timestamps
    end
  end
end
