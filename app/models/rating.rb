class Rating < ApplicationRecord
  LOVE   = 1
  OKAY   = 2
  HATE   = 3
  SAVE   = 4
  IGNORE = 5

  belongs_to :item
  belongs_to :user
  belongs_to :restaurant

  validates :item, presence: true
  validates :user, presence: true
  validates :restaurant, presence: true
  validates :rating, presence: true
end
