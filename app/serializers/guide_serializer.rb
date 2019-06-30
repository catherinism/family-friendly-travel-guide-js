class GuideSerializer < ActiveModel::Serializer
  attributes :id, :title, :summary, :lodging, :itinerary, :destination_location, :airport, :baby_gear_rental, :park, :zoo, :restaurant, :luggage_storage

  belongs_to :destination
  has_many :ratings
end
