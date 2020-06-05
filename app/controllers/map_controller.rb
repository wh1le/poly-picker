# frozen_string_literal: true

class MapController < ApplicationController
  def index
    @polygons = Polygon.limit(20).order(created_at: :desc)
  end
end
