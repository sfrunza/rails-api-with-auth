class ExtraService < ApplicationRecord
  validates :name, :price, presence: true
  before_create :set_index
  after_destroy_commit :update_index

  def set_index
    self.index = ExtraService.count + 1
  end

  def update_index
    ExtraService.where("index > ?", self.index).update_all("index = index - 1")
  end
end
