class Api::V1::SongsController < ActionController::API
  def index
    render json: Song.all.includes(:tracks)
  end

  def show
    render json: Song.includes(:tracks).find(params[:id])
  end

  def create
    Rails.logger.info params

    song = Song.new(title: params[:title])
    params[:tracks].each do |track_file|
      track = song.tracks.build
      track.audio.attach(track_file)
    end

    return head :ok if song.save

    head :bad_request
  end
end
