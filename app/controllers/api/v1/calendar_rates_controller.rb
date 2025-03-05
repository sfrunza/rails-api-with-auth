class Api::V1::CalendarRatesController < ApplicationController
  include Pundit::Authorization
  allow_unauthenticated_access only: %i[index]
  before_action :set_calendar_rate, only: %i[update destroy]

  # GET /calendar_rates
  def index
    calendar_rates =
      CalendarRate
        .includes(:rate)
        .select(
          :id,
          :date,
          :rate_id,
          :enable_automation,
          :enable_auto_booking,
          :is_blocked
        )
        .where(
          date: Date.today.beginning_of_month..11.months.from_now.end_of_month
        )
        .order(:date)

    formatted_rates =
      calendar_rates.each_with_object({}) do |rate, hash|
        hash[rate.date.strftime("%Y-%m-%d")] = {
          id: rate.id,
          formated_date: rate.date.strftime("%Y-%m-%d"),
          rate_id: rate.rate_id,
          enable_automation: rate.enable_automation,
          enable_auto_booking: rate.enable_auto_booking,
          is_blocked: rate.is_blocked,
          rate: rate.rate
        }
      end

    render json: formatted_rates
  end

  # POST /calendar_rates
  def create
    @calendar_rate = CalendarRate.new(calendar_rate_params)

    if @calendar_rate.save
      render json: @calendar_rate, status: :created
    else
      render json: @calendar_rate.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /calendar_rates/1
  def update
    if @calendar_rate.update(calendar_rate_params)
      authorize @calendar_rate
      render json: @calendar_rate
    else
      render json: @calendar_rate.errors, status: :unprocessable_entity
    end
  end

  # DELETE /calendar_rates/1
  def destroy
    @calendar_rate.destroy!
  end

  private

  def set_calendar_rate
    @calendar_rate = CalendarRate.find(params.expect(:id))
  end

  def calendar_rate_params
    params.expect(
      calendar_rate: %i[
        date
        enable_automation
        enable_auto_booking
        is_blocked
        rate_id
      ]
    )
  end
end
