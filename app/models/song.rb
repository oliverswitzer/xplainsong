class Song < ApplicationRecord
  has_many :tracks, autosave: true, dependent: :destroy
end
