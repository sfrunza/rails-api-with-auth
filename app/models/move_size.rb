class MoveSize < ApplicationRecord
  has_one_attached :image

  validates :name, presence: true
  acts_as_list column: :index
end
