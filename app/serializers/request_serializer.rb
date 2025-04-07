class RequestSerializer < ActiveModel::Serializer
  attributes :id,
             :moving_date,
             :status,
             :start_time_window,
             :end_time_window,
             :crew_size,
             :move_size_id,
             :rate,
             :sales_notes,
             :driver_notes,
             :customer_notes,
             :dispatch_notes,
             :deposit,
             :travel_time,
             :min_total_time,
             :can_edit_request,
             :paired_request_id,
             :is_moving_from_storage,
             :work_time,
             :total_time,
             :total_price,
             :details,
             :origin,
             :destination,
             :stops,
             :created_at,
             :updated_at,
             :service_id,
             :packing_id,
             :truck_ids

  attribute :image_urls

  # has_one :customer, serializer: UserSerializer
  # has_one :foreman, serializer: UserSerializer
  # has_many :movers, serializer: UserSerializer

  def image_urls
    if object.images.attached?
      object.images.map do |image|
        {
          id: image.id,
          url: Rails.application.routes.url_helpers.url_for(image)
        }
      end
    end
  end
end
