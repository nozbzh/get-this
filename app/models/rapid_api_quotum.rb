class RapidApiQuotum < ApplicationRecord
  class << self
    def remaining
      first.requests_remaining
    end

    def update_remaining remaining
      record = first_or_create
      record.requests_remaining = remaining
      record.save!
    end
  end
end
