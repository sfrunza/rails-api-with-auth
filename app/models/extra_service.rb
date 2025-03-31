class ExtraService < ApplicationRecord
  validates :name, :price, presence: true
  acts_as_list column: :index, top_of_list: 0
end
