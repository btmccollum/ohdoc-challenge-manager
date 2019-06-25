module TwitterApi
  class SendTweet < ApplicationService
    attr_reader :tweet_content
    
    def initialize(tweet_content, current_user)
      @tweet_content = tweet_content
      @current_user = current_user
    end

    def call
      client = Twitter::REST::Client.new do |config|
        config.consumer_key        = ENV['TWITTER_KEY']
        config.consumer_secret     = ENV['TWITTER_SECRET']
        config.access_token        = @current_user.twitter_token
        config.access_token_secret = @current_user.twitter_token_secret
      end
      # using Twitter gem update method to send update/status (tweet)
      client.update(@tweet_content)
    end
  end
end
