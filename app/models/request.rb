class Request < ApplicationRecord
  enum :status,
       %i[
         pending
         pending_info
         pending_date
         hold
         not_confirmed
         confirmed
         not_available
         completed
         spam
         canceled
         refused
         closed
         expired
         archived
       ]

  belongs_to :customer,
             class_name: "User",
             foreign_key: "customer_id",
             optional: true
  belongs_to :foreman,
             class_name: "User",
             foreign_key: "foreman_id",
             optional: true
  has_many :mover_requests
  has_many :movers, through: :mover_requests, source: :user
  has_many_attached :images
  has_and_belongs_to_many :trucks
  belongs_to :service
  belongs_to :packing
  belongs_to :move_size, optional: true
  belongs_to :paired_request, class_name: "Request", optional: true
  # has_one :contract, dependent: :destroy
  # has_many :payments, as: :entity, class_name: "Payment"
  # has_many :messages, dependent: :destroy

  # validates :service, presence: true
  # validates :packing, presence: true
  # validates :moving_date, presence: true
  # validates :status, presence: true
  # validates :size, presence: true
  # validates :crew_size, presence: true
  # validates :rate, presence: true

  # Entrance type methods
  # def origin_entrance_type
  #   return nil unless origin["floor"]&.dig("entrance_type_id")
  #   EntranceType.find_by(id: origin["floor"]["entrance_type_id"])
  # end

  # def destination_entrance_type
  #   return nil unless destination["floor"]&.dig("entrance_type_id")
  #   EntranceType.find_by(id: destination["floor"]["entrance_type_id"])
  # end

  # def origin_entrance_type=(entrance_type)
  #   origin["floor"] ||= {}
  #   origin["floor"]["entrance_type_id"] = entrance_type&.id
  #   save
  # end

  # def destination_entrance_type=(entrance_type)
  #   destination["floor"] ||= {}
  #   destination["floor"]["entrance_type_id"] = entrance_type&.id
  #   save
  # end

  # def origin_floor_value
  #   origin["floor"]&.dig("value")
  # end

  # def destination_floor_value
  #   destination["floor"]&.dig("value")
  # end

  # def origin_floor_value=(value)
  #   origin["floor"] ||= {}
  #   origin["floor"]["value"] = value
  #   save
  # end

  # def destination_floor_value=(value)
  #   destination["floor"] ||= {}
  #   destination["floor"]["value"] = value
  #   save
  # end
end
