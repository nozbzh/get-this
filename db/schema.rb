# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_02_044651) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.bigint "restaurant_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "description"
    t.integer "rapid_api_id"
    t.integer "rapid_api_restaurant_id"
    t.float "price"
    t.index ["rapid_api_restaurant_id"], name: "index_items_on_rapid_api_restaurant_id"
    t.index ["restaurant_id"], name: "index_items_on_restaurant_id"
  end

  create_table "rapid_api_quota", force: :cascade do |t|
    t.integer "requests_remaining"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "rapid_api_restaurants", force: :cascade do |t|
    t.string "name"
    t.integer "rapid_api_id"
    t.string "full_address"
    t.string "street"
    t.string "city"
    t.string "state"
    t.string "postal_code"
    t.string "phone"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["city"], name: "index_rapid_api_restaurants_on_city"
    t.index ["postal_code"], name: "index_rapid_api_restaurants_on_postal_code"
    t.index ["rapid_api_id"], name: "index_rapid_api_restaurants_on_rapid_api_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.integer "rating"
    t.text "note"
    t.bigint "item_id"
    t.bigint "user_id"
    t.bigint "restaurant_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["item_id"], name: "index_ratings_on_item_id"
    t.index ["restaurant_id"], name: "index_ratings_on_restaurant_id"
    t.index ["user_id"], name: "index_ratings_on_user_id"
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "open_table_id"
    t.string "address"
    t.string "city"
    t.string "state"
    t.string "postal_code"
    t.string "country"
    t.string "phone"
    t.float "latitude"
    t.float "longitude"
    t.string "open_table_image_url"
    t.index ["city"], name: "index_restaurants_on_city"
    t.index ["open_table_id"], name: "index_restaurants_on_open_table_id"
    t.index ["postal_code"], name: "index_restaurants_on_postal_code"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "first_name", null: false
    t.string "last_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
