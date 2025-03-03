class Service < ApplicationRecord
  validates :name, presence: true
  # has_many :requests
  before_create :set_index
  after_destroy_commit :update_index

  def set_index
    self.index = Service.count + 1
  end

  def update_index
    Service.where("index > ?", self.index).update_all("index = index - 1")
  end
end
