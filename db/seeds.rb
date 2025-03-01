# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
User.create!(
  first_name: "Aurel",
  last_name: "Busuioc",
  email_address: "frunza.sergiu3@gmail.com",
  password: "111111",
  role: "admin"
)

User.create!(
  first_name: "admin",
  last_name: "admin",
  email_address: "admin@mail.com",
  password: "111111",
  role: "admin"
)
