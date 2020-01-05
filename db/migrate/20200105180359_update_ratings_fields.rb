class UpdateRatingsFields < ActiveRecord::Migration[6.0]
  def change
    change_column :ratings, :rating, :string
  end
end
