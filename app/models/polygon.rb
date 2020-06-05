# frozen_string_literal: true

class Polygon < ApplicationRecord
  validates :value, presence: true
end
