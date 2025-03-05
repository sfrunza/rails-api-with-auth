Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :session do
        get :show
        get :refresh_token
        delete :destroy
      end
      resources :passwords, param: :token

      resources :services, only: %i[index create destroy] do
        collection { post :bulk_update }
      end

      resources :extra_services, only: %i[index create destroy] do
        collection { post :bulk_update }
      end

      resources :packings, only: %i[index update create destroy] do
        collection { post :bulk_update }
      end

      resources :trucks, only: %i[index create destroy] do
        collection { post :bulk_update }
      end

      resources :rates, only: %i[index create] do
        collection { post :bulk_update }
      end

      resources :calendar_rates, only: %i[index create update destroy]
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check

  get "*path",
      to: "fallback#index",
      constraints: ->(request) { !request.xhr? && request.format.html? }
end
