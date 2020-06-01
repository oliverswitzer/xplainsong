class Song < ApplicationRecord
  has_many_attached :tracks
end
