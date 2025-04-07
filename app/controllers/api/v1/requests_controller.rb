class Api::V1::RequestsController < ApplicationController
  before_action :set_request, only: %i[show update]

  def index
    case Current.user.role
    when "admin", "manager"
      filter = params[:filter]
      per_page = 20
      page = (params[:page] || 1).to_i

      requests =
        Request.includes(:customer).order(id: :desc).page(page).per(per_page)

      case filter
      when "all"
        total_pages = (Request.count.to_f / per_page).ceil
      when "pending"
        pending_statuses = %w[pending pending_info pending_date hold]
        requests = requests.where(status: pending_statuses)
        total_pages =
          (Request.where(status: pending_statuses).count.to_f / per_page).ceil
      when filter
        requests = requests.where(status: filter)
        total_pages = (Request.where(status: filter).count.to_f / per_page).ceil
      else
        total_pages = (Request.count.to_f / per_page).ceil
      end

      serialized_requests =
        ActiveModelSerializers::SerializableResource.new(
          requests,
          each_serializer: RequestTableSerializer
        )

      render json: {
               requests: serialized_requests,
               total_pages: total_pages,
               current_page: requests.current_page,
               total_count: requests.total_count
             }
    when "customer"
      # Customers can view their own requests
      @requests = Current.user.requests_as_customer.order(id: :desc)
      serialized_requests =
        ActiveModelSerializers::SerializableResource.new(
          @requests,
          each_serializer: User::RequestListSerializer
        )
      render json: { requests: serialized_requests }
    when "foreman"
      # Foremen can view only confirmed requests assigned to them
      @requests =
        Current.user.foreman_requests.where(status: :confirmed).order(id: :desc)
      serialized_requests =
        ActiveModelSerializers::SerializableResource.new(
          @requests,
          each_serializer: User::RequestListSerializer
        )
      render json: { requests: serialized_requests }
    when "driver", "helper"
      # Drivers and helpers can view only confirmed requests assigned to them
      @requests =
        Current.user.movers_requests.where(status: :confirmed).order(id: :desc)

      serialized_requests =
        ActiveModelSerializers::SerializableResource.new(
          @requests,
          each_serializer: User::RequestListSerializer
        )
      render json: { requests: serialized_requests }
    else
      render json: { error: "Unauthorized" }, status: :forbidden
    end
  end

  def show
    render json: @request
  end

  def create
    @request = Request.new(request_params.except(:id))
    @request.packing = Packing.find_by(index: 0)
    if @request.save
      render json: @request, status: :created
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  def pair
    paired_request = Request.find(params[:paired_request_id])
    if @request.pair_with(paired_request)
      # serialized_data =
      # RequestSerializer.new(@request).serializable_hash[:data][:attributes]
      # ActionCable.server.broadcast("request_#{params[:id]}", serialized_data)
      render json: @request, serializer: RequestSerializer
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  def update
    @request = Request.find(params[:id])
    if @request.update(request_params)
      render json: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @request = Request.find(params[:id])
    @request.destroy
    head :no_content
  end

  def status_counts
    pending_statuses = %w[pending pending_info pending_date hold]
    total_requests_count = Request.group(:status).count

    total_requests_count["pending"] = total_requests_count
      .slice(*pending_statuses)
      .values
      .sum

    # Remove individual counts of pending_info, pending_date, and hold
    pending_statuses[1..].each { |status| total_requests_count.delete(status) }

    total_requests_count["all"] = Request.count

    render json: total_requests_count
  end

  # POST /api/v1/requests/:id/images
  def images
    @request = Request.find(params[:id])
    if params[:images]
      params[:images].each { |image| @request.images.attach(image) }
    end

    if @request.save
      render json: @request, status: :ok
    else
      render json: {
               errors: @request.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  def delete_image
    @request = Request.find(params[:id])
    image = @request.images.find(params[:image_id])

    if image.purge
      # BroadcastRequestJob.perform_later(@request)
      render json: @request, status: :ok
    else
      render json: {
               errors: ["Failed to delete image"]
             },
             status: :unprocessable_entity
    end
  end

  private

  def set_request
    @request = Request.find_by(id: params[:id])

    # Return 404 if request is not found
    unless @request
      return render json: { error: "Request not found" }, status: :not_found
    end

    # Authorization logic
    case Current.user.role
    when "admin", "manager"
      # Admins and managers have access to all requests
      nil
    when "customer"
      # Customers can only access their own requests
      unless @request.customer_id == Current.user.id
        render json: { error: "Request not found" }, status: :not_found
      end
    when "foreman"
      # Foremen can only access requests assigned to them
      unless @request.foreman_id == Current.user.id
        render json: { error: "Request not found" }, status: :not_found
      end
    when "driver", "helper"
      # Drivers and helpers can only access confirmed requests they're assigned to
      unless @request.status == "confirmed" &&
               @request.movers.exists?(id: Current.user.id)
        render json: { error: "Request not found" }, status: :not_found
      end
    else
      render json: { error: "Unauthorized" }, status: :forbidden
    end
  end

  def request_params
    params.require(:request).permit(
      :moving_date,
      :status,
      :customer_id,
      :service_id,
      :payments,
      :foreman_id,
      mover_ids: [],
      truck_ids: [],
      images: []
    )
  end

  def request_params
    params.require(:request).permit(
      :customer_id,
      :service_id,
      :packing_id,
      :foreman_id,
      :payments,
      :customer,
      :moving_date,
      :status,
      :size,
      :start_time_window,
      :end_time_window,
      :crew_size,
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
      :paired_request,
      :created_at,
      :updated_at,
      :is_moving_from_storage,
      work_time: %i[min max],
      total_time: %i[min max],
      total_price: %i[min max],
      details: %i[
        delicate_items_question_answer
        bulky_items_question_answer
        disassemble_items_question_answer
        comments
        is_touched
      ],
      origin: permit_nested_location_params_with_location,
      destination: permit_nested_location_params_with_location,
      stops: [
        :street,
        :city,
        :state,
        :zip,
        :floor,
        :apt,
        :type,
        location: %i[lat lng]
      ],
      truck_ids: [],
      mover_ids: [],
      images: []
    )
  end

  def permit_nested_location_params
    %i[street city state zip apt floor]
  end

  def permit_nested_location_params_with_location
    permit_nested_location_params + [location: %i[lat lng]]
  end
end
