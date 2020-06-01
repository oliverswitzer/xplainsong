class Track < ApplicationRecord
  has_one_attached :audio
  validates :audio, presence: true
end
