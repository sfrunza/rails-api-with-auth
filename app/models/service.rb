class Service < ApplicationRecord
  validates :name, presence: true
  acts_as_list column: :index, top_of_list: 0
  # has_many :requests
end
