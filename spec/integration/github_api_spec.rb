require 'spec_helper'
require 'github_api'

describe GithubApi do
  before do
    # need to find better way to recreate a test user with functioning tokens
    records_array = ActiveRecord::Base.establish_connection(adapter: "postgresql", database: "ohdoc-challenge-manager_development").connection.execute("SELECT * from users WHERE email LIKE 'api_test_email@protonmail.com'").first
    @current_user = User.create(records_array)
    @content = "### Day 43: June 24, 2019\n\n **Today's Progress:** Tested my API calls today.\n\n **Thoughts:** Today was a good day!\n\n **Link(s):** https://github.com/btmccollum/ohdoc-challenge-manager\n "
  end

  context "calling the GitHub API" do
    it "does not throw an error" do
      VCR.use_cassette('successful_post') do
        commit = GithubApi::UpdateMarkdownFile.call('OHDOC Challenge Manager', 'Day 43: June 24, 2019', @content, @current_user)
        res = JSON.parse(commit.body)
        expect(res.keys).to include('commit')
        expect(res['commit'].keys).to include('sha')
        expect(res['commit'].keys).to include('url')
        expect(res['commit'].keys).to include('message')
      end
    end
  end
end
