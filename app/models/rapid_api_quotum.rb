class RapidApiQuotum < ApplicationRecord
  MAX_QUOTA = 500

  class << self
    def remaining
      record = first_or_create(requests_remaining: MAX_QUOTA)
      first.requests_remaining
    end

    def update_remaining remaining
      record = first_or_create
      record.requests_remaining = remaining
      record.save!
    end
  end
end
