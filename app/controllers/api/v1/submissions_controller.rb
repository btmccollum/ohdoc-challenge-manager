class Api::V1::SubmissionsController < ApplicationController
    def index
        user_submissions = Submission.where("id = ?", current_user.id)
        submission_hash = SubmissionSerializer.new(user_submissions)
        render json: { submissions: user_submissions }, status: :ok
    end

    def show
        user_submission = Submission.find_by(params[:id])
        render json: { submission: user_submission }, status: :ok
    end

    def create

        content = "
            Name: #{submission_params[:repoName]}
            Path: #{submission_params[:filePath]}

            Title: #{submission_params[:entryTitle]}
            Progress: #{submission_params[:progress]}
            Thougts: #{submission_params[:thougts]}
        "
        binding.pry
        user_submission = Submission.new
        user_submission.title = submission_params[:entryTitle]
        user_submission.content = submission_params[:entryTitle]
        submission_hash = SubmissionSerializer.new(user_submission).serializable_hash
        binding.pry

        if params[:submission][:twitter]
            binding.pry
            # make Twitter call
        end

        if params[:submission][:github]
            binding.pry
            # make GitHub call
            # append_file = Github::Repo.
        end

        binding.pry
        render json: { submission: submission_hash }, status: :ok
    end
    # need to handle both twitter and/or github submissions when applicable

    # GitHub:
    # 1) # fetch blob SHA to be able to commit
    # https://api.github.com/repos/btmccollum/100-days-of-code/contents/log.md

    # 2) response, need to grab "sha" for patch, and contents"
        # {
        #     "name": "log.md",
        #     "path": "log.md",
        #     "sha": "eb0a318d9b41868e202e13c9b0f3f58c192834d5",
        #     "size": 52988,
        #     "url": "https://api.github.com/repos/btmccollum/100-days-of-code/contents/log.md?ref=master",
        #     "html_url": "https://github.com/btmccollum/100-days-of-code/blob/master/log.md",
        #     "git_url": "https://api.github.com/repos/btmccollum/100-days-of-code/git/blobs/eb0a318d9b41868e202e13c9b0f3f58c192834d5",
        #     "download_url": "https://raw.githubusercontent.com/btmccollum/100-days-of-code/master/log.md",
        #     "type": "file",
        #     "content": "IyAxMDAgRGF5cyBPZiBDb2RlIC0gTG9nCgojIyMgRGF5IDE6IEphbnVhcnkg\nMiwgMjAxOSAKCioqVG9kYXkncyBQcm9ncm...M6Ly9naXRodWIuY29tL2J0bWNjb2xsdW0vZHJvcGxl\ndC1hcGkKCioqVGltZSBTcGVudCBUb2RheToqKiAxMCBob3VycwoKKipKb3Vy\nbmV5IFRpbWUqKiAxMDEwLjUgaG91cnM=\n",
        #     "encoding": "base64",
        #     "_links": {
        #         "self": "https://api.github.com/repos/btmccollum/100-days-of-code/contents/log.md?ref=master",
        #         "git": "https://api.github.com/repos/btmccollum/100-days-of-code/git/blobs/eb0a318d9b41868e202e13c9b0f3f58c192834d5",
        #         "html": "https://github.com/btmccollum/100-days-of-code/blob/master/log.md"
        #     }
        # }

    # # github submission

    #3) # need to decode original contents from base 64, append the new log entry, and then encode to base 64

    # 4) POST to https://api.github.com/repos/btmccollum/100-days-of-code/contents/log.md

    # # working Body sample to complete a PUT request to modify file contents
    # header = {
    #     "Authorization": "token #{GITHUB_SECRET}",
    #     "User-Agent": "ohdoc-challenge-manager/v1",
    #     "Content-Type": "application/json"
    # }

    # body = {
    #     "message": "testing API put method",
    #     # content must be Base64 encoded
    #     "content": "RGF5IDA6IEZlYnJ1YXJ5IDMwLCAyMDE2IChFeGFtcGxlIDEpIChkZWxldGUgbWUgb3IgY29tbWVudCBtZSBvdXQpIFRvZGF5J3MgUHJvZ3Jlc3M6IEZpeGVkIENTUywgd29ya2VkIG9uIGNhbnZhcyBmdW5jdGlvbmFsaXR5IGZvciB0aGUgYXBwLiAgVGhvdWdodHM6IEkgcmVhbGx5IHN0cnVnZ2xlZCB3aXRoIENTUywgYnV0LCBvdmVyYWxsLCBJIGZlZWwgbGlrZSBJIGFtIHNsb3dseSBnZXR0aW5nIGJldHRlciBhdCBpdC4gQ2FudmFzIGlzIHN0aWxsIG5ldyBmb3IgbWUsIGJ1dCBJIG1hbmFnZWQgdG8gZmlndXJlIG91dCBzb21lIGJhc2ljIGZ1bmN0aW9uYWxpdHkuICBMaW5rIHRvIHdvcms6IENhbGN1bGF0b3IgQXBw",
    #     "sha": "eb0a318d9b41868e202e13c9b0f3f58c192834d5"
    # }

    # Twitter sample:
        # curl -XPOST 
        # --url 'https://api.twitter.com/1.1/statuses/update.json?status=hello' 
        # --header 'authorization: OAuth
        # oauth_consumer_key="oauth_customer_key",
        # oauth_nonce="generated_oauth_nonce",
        # oauth_signature="generated_oauth_signature",
        # oauth_signature_method="HMAC-SHA1",
        # oauth_timestamp="generated_timestamp",
        # oauth_token="oauth_token",
        # oauth_version="1.0"'
        # You many want to change the status from 'hello' to something different.

        # You can use also use any other OAuth helper library you'd like such as twurl.

        # $ twurl -d 'status=Test tweet using the POST statuses/update endpoint' /1.1/statuses/update.json
    private

    def submission_params
        params.require(:submission).permit(:title, :twitter, :github, :content, :repoName, :filePath, :entryTitle, :progress, :thoughts, :link)
    end
end