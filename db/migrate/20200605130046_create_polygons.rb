class CreatePolygons < ActiveRecord::Migration[6.0]
  def change
    enable_extension 'citext'

    create_table :polygons do |t|
      t.jsonb :value, null: false, default: '{}'
      t.timestamps
    end
  end
end
