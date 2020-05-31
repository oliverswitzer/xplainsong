Rails.application.routes.draw do
  root to: 'application#index'

  namespace :api, constrains: { format: 'json' } do
    namespace :v1 do
      resources :songs
    end
  end

  get '*path', to: 'application#index', constraints: { format: 'html' }
end
