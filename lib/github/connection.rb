require 'faraday'
require 'json'

class Connection
  BASE = 'https://api.github.com'

  def self.api
    Faraday.new(url: BASE) do |faraday|
      faraday.response :logger
      faraday.adapter Faraday.default_adapter
      faraday.headers['Content-Type'] = 'application/json'
      faraday.headers['Authorization'] = ENV['GITHUB_SECRET']
    end
  end
end