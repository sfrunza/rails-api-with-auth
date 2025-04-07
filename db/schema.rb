# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_04_01_145349) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pg_trgm"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "calendar_rates", force: :cascade do |t|
    t.date "date"
    t.boolean "enable_automation"
    t.boolean "enable_auto_booking"
    t.boolean "is_blocked"
    t.bigint "rate_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["date"], name: "index_calendar_rates_on_date"
    t.index ["rate_id"], name: "index_calendar_rates_on_rate_id"
  end

  create_table "entrance_types", force: :cascade do |t|
    t.string "name", null: false
    t.string "form_name", null: false
    t.integer "index", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "extra_services", force: :cascade do |t|
    t.string "name"
    t.integer "price"
    t.boolean "enabled", default: true
    t.integer "index"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "global_settings", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "move_sizes", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.integer "index", default: 0
    t.integer "dispersion"
    t.integer "truck_count"
    t.integer "weight"
    t.integer "volume"
    t.jsonb "volume_with_dispersion", default: {"max" => 0, "min" => 0}
    t.jsonb "crew_size_settings", default: [[2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 3, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2]]
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "packings", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.boolean "is_default", default: false
    t.integer "labor_increase"
    t.integer "index"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rates", force: :cascade do |t|
    t.integer "extra_mover_rate"
    t.integer "extra_truck_rate"
    t.boolean "enable"
    t.string "name"
    t.string "color"
    t.jsonb "movers_rates", default: {"2" => {"hourly_rate" => 10000}, "3" => {"hourly_rate" => 10000}, "4" => {"hourly_rate" => 10000}, "5" => {"hourly_rate" => 10000}, "6" => {"hourly_rate" => 10000}, "7" => {"hourly_rate" => 10000}, "8" => {"hourly_rate" => 10000}, "9" => {"hourly_rate" => 10000}, "10" => {"hourly_rate" => 10000}}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "requests", force: :cascade do |t|
    t.bigint "service_id", null: false
    t.bigint "packing_id", default: 1, null: false
    t.bigint "move_size_id"
    t.bigint "customer_id"
    t.bigint "foreman_id"
    t.datetime "moving_date"
    t.datetime "delivery_date"
    t.integer "status", default: 0
    t.integer "start_time_window"
    t.integer "end_time_window"
    t.integer "start_time_window_delivery"
    t.integer "end_time_window_delivery"
    t.jsonb "work_time", default: {"max" => 0, "min" => 0}, null: false
    t.jsonb "total_time", default: {"max" => 0, "min" => 0}, null: false
    t.jsonb "total_price", default: {"max" => 0, "min" => 0}, null: false
    t.integer "travel_time", default: 0, null: false
    t.integer "min_total_time", default: 120, null: false
    t.integer "crew_size"
    t.boolean "can_edit_request", default: true, null: false
    t.integer "rate"
    t.jsonb "stops", default: []
    t.text "sales_notes"
    t.text "driver_notes"
    t.text "customer_notes"
    t.text "dispatch_notes"
    t.integer "deposit", default: 10000, null: false
    t.boolean "is_moving_from_storage", default: false, null: false
    t.bigint "paired_request_id"
    t.jsonb "details", default: {"comments" => "", "is_touched" => false, "bulky_items_question_answer" => "", "delicate_items_question_answer" => "", "disassemble_items_question_answer" => ""}, null: false
    t.jsonb "origin", default: {"apt" => "", "zip" => "", "city" => "", "floor" => nil, "state" => "", "street" => "", "location" => {"lat" => 0, "lng" => 0}}, null: false
    t.jsonb "destination", default: {"apt" => "", "zip" => "", "city" => "", "floor" => nil, "state" => "", "street" => "", "location" => {"lat" => 0, "lng" => 0}}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_requests_on_created_at"
    t.index ["customer_id"], name: "index_requests_on_customer_id"
    t.index ["foreman_id"], name: "index_requests_on_foreman_id"
    t.index ["move_size_id"], name: "index_requests_on_move_size_id"
    t.index ["moving_date"], name: "index_requests_on_moving_date"
    t.index ["packing_id"], name: "index_requests_on_packing_id"
    t.index ["paired_request_id"], name: "index_requests_on_paired_request_id"
    t.index ["service_id"], name: "index_requests_on_service_id"
    t.index ["status"], name: "index_requests_on_status"
    t.index ["updated_at"], name: "index_requests_on_updated_at"
  end

  create_table "requests_trucks", id: false, force: :cascade do |t|
    t.bigint "request_id", null: false
    t.bigint "truck_id", null: false
    t.index ["request_id", "truck_id"], name: "index_requests_trucks_on_request_id_and_truck_id"
    t.index ["truck_id", "request_id"], name: "index_requests_trucks_on_truck_id_and_request_id"
  end

  create_table "services", force: :cascade do |t|
    t.string "name"
    t.boolean "enabled", default: true
    t.integer "miles_setting"
    t.integer "index"
    t.boolean "is_default", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "ip_address"
    t.string "user_agent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "settings", force: :cascade do |t|
    t.string "var", null: false
    t.text "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["var"], name: "index_settings_on_var", unique: true
  end

  create_table "trucks", force: :cascade do |t|
    t.string "name"
    t.boolean "is_active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email_address", null: false
    t.string "password_digest", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.boolean "active", default: true
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email_address"], name: "index_users_on_email_address", opclass: :gin_trgm_ops, using: :gin
    t.index ["first_name"], name: "index_users_on_first_name", opclass: :gin_trgm_ops, using: :gin
    t.index ["last_name"], name: "index_users_on_last_name", opclass: :gin_trgm_ops, using: :gin
    t.index ["phone"], name: "index_users_on_phone", opclass: :gin_trgm_ops, using: :gin
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "calendar_rates", "rates"
  add_foreign_key "requests", "packings"
  add_foreign_key "requests", "requests", column: "paired_request_id"
  add_foreign_key "requests", "services"
  add_foreign_key "requests", "users", column: "customer_id"
  add_foreign_key "requests", "users", column: "foreman_id"
  add_foreign_key "sessions", "users"
end
