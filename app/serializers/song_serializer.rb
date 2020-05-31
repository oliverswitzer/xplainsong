class SongSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :stems

  def stems
    object.stems.map do |stem|
      { id: stem.id, url: stem.blob.service_url }
    end
  end
end
