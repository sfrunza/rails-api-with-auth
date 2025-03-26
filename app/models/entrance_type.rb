class EntranceType < ApplicationRecord
  validates :name, :form_name, presence: true
  acts_as_list column: :index, top_of_list: 0
end
