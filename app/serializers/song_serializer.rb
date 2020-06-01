class SongSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :tracks

  def tracks
    object.tracks.with_attached_audio.map do |track|
      { id: track.id, url: track.audio.blob.service_url }
    end
  end
end
