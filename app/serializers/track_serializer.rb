class TrackSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :url, :name

  def url
    rails_blob_path(object.audio, only_path: true)
  end
end
