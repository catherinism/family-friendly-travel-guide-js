class Guide < ApplicationRecord
  has_many :ratings
  has_many :users, through: :ratings
  belongs_to :destination
  has_one_attached :image

  validates :title, presence: true
  validates :summary, presence: true

  scope :rated, -> { joins(:ratings).distinct("ratings.guide_id") }

  def destination_location=(location)
    self.destination = Destination.find_or_create_by(location: location)
  end

  def destination_location
     self.destination ? self.destination.location : nil
  end

end
