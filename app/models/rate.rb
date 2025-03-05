class Rate < ApplicationRecord
  #  has_many :calendar_rates
  # after_update_commit :update_calendar_rates
  before_update :prevent_disable_first_rate

  # def update_calendar_rates
  #   unless self.enable
  #     calendar_rates.each do |calendar_rate|
  #       calendar_rate.update(rate: Rate.find(1))
  #     end
  #   end
  # end

  def prevent_disable_first_rate
    if self.enable == false && self.id == 1
      errors.add(:rate, "Cannot disable the first rate")
      throw :abort
    end
  end
end
