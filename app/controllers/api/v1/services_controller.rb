class Api::V1::ServicesController < ApplicationController
  include Pundit::Authorization
  allow_unauthenticated_access only: %i[index]
  before_action :set_service, only: %i[destroy]

  # GET /services
  def index
    @services =
      Service.select(
        :id,
        :name,
        :enabled,
        :miles_setting,
        :index,
        :is_default
      ).order(:index)

    render json: @services
  end

  # POST /services
  def create
    @service = Service.new(service_params)
    authorize @service
    if @service.save
      render json: @service, status: :created
    else
      render json: @service.errors, status: :unprocessable_entity
    end
  end

  def bulk_update
    if params[:services].blank?
      return(
        render json: {
                 error: "Unprocessable entity"
               },
               status: :unprocessable_entity
      )
    end

    authorize Service

    @services = params[:services]
    @services.each do |service|
      s = Service.find(service[:id])
      s.update(
        service.except(:id, :created_at, :updated_at).permit(
          :name,
          :enabled,
          :miles_setting,
          :index,
          :is_default
        )
      )
    end
    render json: @services, status: :accepted
  end

  # DELETE /services/1
  def destroy
    authorize @service
    @service.destroy!
  end

  private

  def set_service
    @service = Service.find(params.expect(:id))
  end

  def service_params
    params.expect(service: %i[name enabled miles_setting index is_default])
  end
end
