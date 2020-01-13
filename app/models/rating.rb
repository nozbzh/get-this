class Rating < ApplicationRecord
  belongs_to :item
  belongs_to :user
  belongs_to :restaurant

  validates :item, presence: true
  validates :user, presence: true
  validates :restaurant, presence: true
  validates :rating, presence: true

  validates :rating, inclusion: {
    in: %w(love okay hate save ignore),
    message: "%{value} is not a valid rating"
  }

  # TODO: add unique index (or just plain validation) on user_id and item_id (only 1 rating per user per item)
end
