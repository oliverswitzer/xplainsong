class Api::V1::SongsController < ActionController::API
  def index
    render json: [{ id: 1, title: 'Some song title' }, { id: 2, title: 'Some other song title' }]
  end

  def create
    head :ok
  end
end
