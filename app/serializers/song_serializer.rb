class SongSerializer < ActiveModel::Serializer
  attributes :id, :title

  has_many :tracks
end
