# frozen_string_literal: true

module Api
  class PolygonsController < ApiController
    def create
      @polygon = Polygon.new(value: polygon_params)

      if @polygon.save
        render json: @polygon, status: 200
      else
        render json: @polygon.errors, status: 422
      end
    end

    def index
      @polygons = Polygon.limit(20).order(created_at: :desc)

      render json: @polygons
    end

    private

    def load_polygon
      @polygon = Polygon.find(params[:id])
    end

    def polygon_params
      strong_params = params.require(:polygon).permit(
        :type,
        properties: {},
        geometry: [:type]
      )
      strong_params[:geometry][:coordinates] = params.dig(
        :polygon, :geometry, :coordinates
      )
      strong_params
    end
  end
end
