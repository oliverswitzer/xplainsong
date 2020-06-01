class SongSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :tracks

  def tracks
    object.tracks.map do |track|
      { id: track.id, url: track.blob.service_url }
    end
  end
end
