Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:4173",
            ENV["BASE_URL"]

    resource "*",
             headers: :any,
             methods: %i[get post put patch delete options head],
             credentials: true
  end
end
