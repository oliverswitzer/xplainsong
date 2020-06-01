class CreateTracks < ActiveRecord::Migration[6.0]
  def change
    create_table :tracks do |t|
      t.belongs_to :song

      t.timestamps
    end
  end
end
