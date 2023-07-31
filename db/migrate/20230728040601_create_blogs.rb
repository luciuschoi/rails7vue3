class CreateBlogs < ActiveRecord::Migration[7.0]
  def change
    create_table :blogs do |t|
      t.string :subject
      t.text :context

      t.timestamps
    end
  end
end
