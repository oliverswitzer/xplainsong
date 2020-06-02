class AddNameToTracks < ActiveRecord::Migration[6.0]
  def change
    add_column :tracks, :name, :string

    add_index :tracks, :name
  end
end
