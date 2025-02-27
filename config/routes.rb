Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :session do
        get :show
        get :refresh_token
        delete :destroy
      end
      resources :passwords, param: :token
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check

  get "*path",
      to: "fallback#index",
      constraints: ->(request) { !request.xhr? && request.format.html? }
end
