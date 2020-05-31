class Api::V1::SongsController < ActionController::API
  def index
    render json: Song.all
  end

  def create
    Rails.logger.info params

    song = Song.new(title: params[:title])
    song.stems.attach(params[:stems])

    return head :ok if song.save

    head :bad_request
  end
end
