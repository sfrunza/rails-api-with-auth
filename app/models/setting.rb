# RailsSettings Model
class Setting < RailsSettings::Base
  cache_prefix { "v1" }

  has_one_attached :company_logo
  # Define fields
  field :company_name, type: :string
  field :company_address, type: :string
  field :company_phone, type: :string
  field :company_email, type: :string
  field :company_website, type: :string
  field :move_size_options,
        type: :array,
        default: [
          {
            id: 1,
            name: "Room or less (partial move)",
            value: "room_or_less",
            movers_count: [
              [2, 2, 5, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 3, 2, 2],
              [2, 4, 2, 2, 2, 5, 2, 2],
              [2, 2, 2, 3, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2, 2]
            ]
          },
          {
            id: 2,
            name: "Studio apartment",
            value: "studio_apartment",
            movers_count: [
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2]
            ]
          },
          {
            id: 3,
            name: "Small 1 Bedroom apartment",
            value: "small_1_bedroom_apartment",
            movers_count: [
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2]
            ]
          },
          {
            id: 4,
            name: "Large 1 Bedroom apartment",
            value: "large_1_bedroom_apartment",
            movers_count: [
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2]
            ]
          },
          {
            id: 5,
            name: "Small 2 Bedroom apartment",
            value: "small_2_bedroom_apartment",
            movers_count: [
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2]
            ]
          },
          {
            id: 6,
            name: "Large 2 Bedroom apartment",
            value: "large_2_bedroom_apartment",
            movers_count: [
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2]
            ]
          },
          {
            id: 7,
            name: "3 Bedroom apartment",
            value: "3_bedroom_apartment",
            movers_count: [
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2]
            ]
          },
          {
            id: 8,
            name: "2 Bedroom House/Townhouse",
            value: "2_bedroom_house_townhouse",
            movers_count: [
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2]
            ]
          },
          {
            id: 9,
            name: "3 Bedroom House/Townhouse",
            value: "3_bedroom_house_townhouse",
            movers_count: [
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2]
            ]
          },
          {
            id: 10,
            name: "4 Bedroom House/Townhouse",
            value: "4_bedroom_house_townhouse",
            movers_count: [
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2]
            ]
          },
          {
            id: 11,
            name: "Commercial Move",
            value: "commercial_move",
            movers_count: [
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2],
              [2, 2, 2, 2, 2, 2, 2]
            ]
          }
        ]
  field :floor_options,
        type: :array,
        default: [
          { id: 1, name: "1st floor", value: "1" },
          { id: 2, name: "2nd floor", value: "2" },
          { id: 3, name: "3rd floor", value: "3" },
          { id: 4, name: "4th floor", value: "4" },
          { id: 5, name: "5th floor", value: "5" },
          { id: 6, name: "House", value: "house" },
          { id: 7, name: "Elevator", value: "elevator" }
        ]

  # Define your fields
  # field :host, type: :string, default: "http://localhost:3000"
  # field :default_locale, default: "en", type: :string
  # field :confirmable_enable, default: "0", type: :boolean
  # field :admin_emails, default: "admin@rubyonrails.org", type: :array
  # field :omniauth_google_client_id, default: (ENV["OMNIAUTH_GOOGLE_CLIENT_ID"] || ""), type: :string, readonly: true
  # field :omniauth_google_client_secret, default: (ENV["OMNIAUTH_GOOGLE_CLIENT_SECRET"] || ""), type: :string, readonly: true
end
