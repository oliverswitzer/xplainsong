Rails.application.routes.draw do
  root to: 'application#index'

  namespace :api, constrains: { format: 'json' } do
    namespace :v1 do
      resources :songs
    end
  end

  class NotAnAssetPathConstraint
    def matches?(request)
      request.url !~ /rails\/active_storage\/.*/
    end
  end

  # Needed in order to let React Router do it's thing
  get '*path', to: 'application#index', constraints: NotAnAssetPathConstraint.new
end
