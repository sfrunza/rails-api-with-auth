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
      resources :employees, only: %i[index show create update]

      resources :settings, only: %i[index create] do
        collection { post :bulk_update }
      end

      resources :move_sizes, only: %i[index create update destroy] do
        collection { post :bulk_update }
      end

      resources :entrance_types, only: %i[index create destroy] do
        collection { post :bulk_update }
      end

      resources :requests do
        post "pair", on: :member
        get "status_counts", on: :collection
        # resources :messages, only: %i[index create]
        # resources :payments do
        #   get :get_card_on_file, on: :collection
        # end
        # resource :contract, only: %i[create show update]
        post :images, on: :member
        delete "/images/:image_id", to: "requests#delete_image", on: :member
      end

      resources :search, only: %i[index]
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check

  get "*path",
      to: "fallback#index",
      constraints: ->(request) { !request.xhr? && request.format.html? }
end
