require "rails_helper"

RSpec.describe Polygon, type: :model do
  it { is_expected.to validate_presence_of :value }
end
