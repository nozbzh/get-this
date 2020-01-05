class Rating < ApplicationRecord
  belongs_to :item
  belongs_to :user
  belongs_to :restaurant

  validates :item, presence: true
  validates :user, presence: true
  validates :restaurant, presence: true
  validates :rating, presence: true
end
