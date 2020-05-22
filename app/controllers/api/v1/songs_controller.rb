class Api::V1::SongsController < ActionController::API
  def index
    render json: { yo: 'bar' }
  end

  def create
    head :ok
  end
end
