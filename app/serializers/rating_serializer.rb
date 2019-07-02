class RatingSerializer < ActiveModel::Serializer
  attributes :id, :value, :comment

  belongs_to :guide
end
