# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts "Deleting old records..."

Service.delete_all
Packing.delete_all
Rate.delete_all
Truck.delete_all
Session.delete_all
User.delete_all

User.create!(
  first_name: "Aurel",
  last_name: "Busuioc",
  email_address: "frunza.sergiu3@gmail.com",
  password: "111111",
  role: "admin"
)
User.create!(
  first_name: "manager",
  last_name: "manager",
  email_address: "manager@mail.com",
  password: "111111",
  role: "manager"
)
User.create(
  first_name: "Test1",
  last_name: "Test1",
  email: "test1@mail.com",
  password: "111111"
)
User.create(
  first_name: "Test2",
  last_name: "Test2",
  email: "test2@mail.com",
  password: "111111"
)
User.create(
  first_name: "Helper",
  last_name: "Helper",
  email: "helper@mail.com",
  role: "helper",
  password: "111111"
)
User.create(
  first_name: "Helper2",
  last_name: "Helper2",
  email: "helper2@mail.com",
  role: "helper",
  password: "111111"
)
User.create(
  first_name: "Helper3",
  last_name: "Helper3",
  email: "helper3@mail.com",
  role: "helper",
  password: "111111"
)
User.create(
  first_name: "Helper4",
  last_name: "Helper4",
  email: "helper4@mail.com",
  role: "helper",
  password: "111111"
)
User.create(
  first_name: "Driver",
  last_name: "Driver",
  email: "driver@mail.com",
  role: "driver",
  password: "111111"
)
User.create(
  first_name: "Driver2",
  last_name: "Driver2",
  email: "driver2@mail.com",
  role: "driver",
  password: "111111"
)
User.create(
  first_name: "Foreman",
  last_name: "Foreman",
  email: "foreman@mail.com",
  role: "foreman",
  password: "111111"
)
User.create(
  first_name: "Foreman2",
  last_name: "Foreman2",
  email: "foreman2@mail.com",
  role: "foreman",
  password: "111111"
)
User.create(
  first_name: "Admin",
  last_name: "Admin",
  email: "admin@mail.com",
  role: "admin",
  password: "111111"
)

Service.create!(
  name: "Local move",
  enabled: true,
  miles_setting: 150,
  index: 0,
  is_default: true
)

Service.create!(
  name: "Flat Rate",
  enabled: true,
  miles_setting: 150,
  index: 1,
  is_default: true
)

Service.create!(
  name: "Loading help",
  enabled: true,
  miles_setting: 0,
  index: 2,
  is_default: true
)

Service.create!(
  name: "Unloading help",
  enabled: true,
  miles_setting: 0,
  index: 3,
  is_default: true
)

Service.create!(
  name: "Inside move",
  enabled: true,
  miles_setting: 0,
  index: 4,
  is_default: true
)

Service.create!(
  name: "Packing only",
  enabled: true,
  miles_setting: 0,
  index: 5,
  is_default: true
)

Service.create!(
  name: "Moving & Storage",
  enabled: true,
  miles_setting: 0,
  index: 6,
  is_default: true
)

Service.create!(
  name: "Overnight truck Storage",
  enabled: true,
  miles_setting: 0,
  index: 7,
  is_default: true
)

Rate.create(name: "Discount", color: "#00a455", enable: true)
Rate.create(name: "Regular", color: "#0044ff", enable: true)
Rate.create(name: "Subpeak", color: "#ffa500", enable: true)
Rate.create(name: "Peak", color: "#ff5400", enable: true)
Rate.create(name: "High Peak", color: "#fb0009", enable: true)

Truck.create(name: "18 FT")
Truck.create(name: "20 FT")
Truck.create(name: "26 FT")

Packing.create(
  name: "I will pack by myself",
  description: "This is some description.",
  is_default: true,
  labor_increase: 0,
  index: 0
)

Packing.create(
  name: "I need Partial Packing Help",
  description: "This is some description.",
  is_default: false,
  labor_increase: 25,
  index: 1
)

Packing.create(
  name: "I need Full Packing Service",
  description: "This is some description.",
  is_default: false,
  labor_increase: 50,
  index: 2
)

puts "Seeding complete!"
