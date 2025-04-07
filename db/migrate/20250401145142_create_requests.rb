class CreateRequests < ActiveRecord::Migration[8.0]
  def change
    create_table :requests do |t|
      t.references :service, null: false, foreign_key: true
      t.references :packing, null: false, foreign_key: true, default: 1
      t.references :move_size
      t.references :customer, foreign_key: { to_table: :users }, index: true
      t.references :foreman, foreign_key: { to_table: :users }, index: true
      t.datetime :moving_date
      t.datetime :delivery_date
      t.integer :status, default: 0
      t.integer :start_time_window
      t.integer :end_time_window
      t.integer :start_time_window_delivery
      t.integer :end_time_window_delivery
      t.jsonb :work_time, default: { min: 0, max: 0 }, null: false
      t.jsonb :total_time, default: { min: 0, max: 0 }, null: false
      t.jsonb :total_price, default: { min: 0, max: 0 }, null: false
      t.integer :travel_time, default: 0, null: false
      t.integer :min_total_time, default: 120, null: false
      t.integer :crew_size
      t.boolean :can_edit_request, default: true, null: false
      t.integer :rate
      t.jsonb :stops, default: []
      t.text :sales_notes
      t.text :driver_notes
      t.text :customer_notes
      t.text :dispatch_notes
      t.integer :deposit, default: 10_000, null: false
      t.boolean :is_moving_from_storage, default: false, null: false
      t.references :paired_request,
                   foreign_key: {
                     to_table: :requests
                   },
                   index: true
      t.jsonb :details,
              default: {
                delicate_items_question_answer: "",
                bulky_items_question_answer: "",
                disassemble_items_question_answer: "",
                comments: "",
                is_touched: false
              },
              null: false
      t.jsonb :origin,
              default: {
                street: "",
                city: "",
                state: "",
                zip: "",
                apt: "",
                floor: nil,
                location: {
                  lat: 0,
                  lng: 0
                }
              },
              null: false
      t.jsonb :destination,
              default: {
                street: "",
                city: "",
                state: "",
                zip: "",
                apt: "",
                floor: nil,
                location: {
                  lat: 0,
                  lng: 0
                }
              },
              null: false

      t.timestamps
    end

    add_index :requests, :status
    add_index :requests, :moving_date
    add_index :requests, :created_at
    add_index :requests, :updated_at
  end
end
