class Api::V1::SongsController < ActionController::API
  def index
    render json: { yo: 'bar' }
  end
end
