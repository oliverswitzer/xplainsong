class Api::V1::SongsController < ActionController::API
  def index
    render json: Song.includes(:tracks).all
  end

  def show
    render json: Song.includes(tracks: [:audio_blob, :audio_attachment]).find(params[:id])
  end

  def create
    Rails.logger.info params

    song = Song.new(title: params[:title])
    params[:tracks].each do |track_file|
      track = song.tracks.build(name: track_file.original_filename)
      track.audio.attach(track_file)
    end

    return head :ok if song.save

    head :bad_request
  end
end
