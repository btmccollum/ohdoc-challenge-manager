require 'spec_helper'
require 'github_api'

describe GithubApi do
  before do
    # need to find better way to recreate a test user with functioning tokens
    @current_user = User.find_by(email: "api_test_email@protonmail.com")
    @content = "### Day 43: June 24, 2019\n\n **Today's Progress:** Tested my API calls today.\n\n **Thoughts:** Today was a good day!\n\n **Link(s):** https://github.com/btmccollum/ohdoc-challenge-manager\n "
  end

  context "calling the GitHub API" do
    it "does not throw an error" do
      VCR.use_cassette('successful_post') do
        commit = GithubApi::UpdateMarkdownFile.call('OHDOC Challenge Manager', 'Day 43: June 24, 2019', @content, @current_user)
        res = commit.get_result
        expect(res.keys).to include('data')
        expect(res['data'].keys).to include('children')
        expect(res['data']['children'].count).to be >= 1
        expect(res['data']['children'][0].keys).to include('data')
        # test more stuff!
      end
    end
  end
end