class Api::V1::SongsController < ActionController::API
  def index
    render json: Song.with_attached_tracks
  end

  def create
    Rails.logger.info params

    song = Song.new(title: params[:title])
    song.tracks.attach(params[:tracks])

    return head :ok if song.save

    head :bad_request
  end
end
