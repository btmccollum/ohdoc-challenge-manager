require "base64"

class Api::V1::SubmissionsController < ApplicationController
  def index
    user_submissions = Submission.where("user_id = ?", current_user.id)
    submission_hash = SubmissionSerializer.new(user_submissions)
    render json: { submissions: user_submissions }, status: :ok
  end

  def show
    user_submission = Submission.find_by(params[:id])
    render json: { submission: user_submission }, status: :ok
  end

  def create
    user_submission = Submission.new
    user_submission.user_id = current_user.id

    if params[:service] == "twitter"
      # need to pass in tweet content and current_user to have access to tokens
      TwitterAPI::SendTweet.call(submission_params[:tweet], current_user)

      user_submission.tap do |submission|
        submission.title = "#100DOC Tweet"
        submission.twitter = true 
        submission.content = submission_params[:tweet]
      end
    elsif params[:service] == "github"
      # creating content markdown blurb to add to user's existing log md file on github
      content = "### #{submission_params[:entryTitle]}\n\n **Today's Progress:** #{submission_params[:progress]}\n\n **Thoughts:** #{submission_params[:thoughts]}\n\n **Link(s):** #{submission_params[:link]}\n "
      api = Faraday.new("https://api.github.com/repos/#{current_user.github_username}/#{current_user.github_repo_path}")

      # get request for repo details to obtain repo sha   
      repo_req = api.get do |req|
        req.headers['User-Agent'] = 'OHDOC Challenge Manager'
        req.headers['Authorization'] = "token #{current_user.github_token}"
      end

      repo_json = JSON.parse(repo_req.body)
      repo_sha = repo_json['sha'] 

      # github content is base64 encoded and must be received as such
      # decoding existing content to then append the new content and re encode it
      file_content = Base64.decode64(repo_json['content']) << content
      new_file_content = Base64.encode64(file_content)

      # git commit must be in json format 
      data = { message: "Adding log for: #{submission_params[:entryTitle]}", sha: repo_sha, content: new_file_content }.to_json

      # sending put request to append new content to existing md log file 
      edit_file = api.put do |req|
        req.headers['User-Agent'] = 'OHDOC Challenge Manager'
        req.headers['Authorization'] = "token #{current_user.github_token}"
        req.body = data
      end

      # setting github specific data
      user_submission.title = submission_params[:entryTitle]
      user_submission.github = true 
      user_submission.content = content
    end

    if user_submission.save
      submission_hash = SubmissionSerializer.new(user_submission).serializable_hash
      render json: { submission: submission_hash }, status: :ok
    else
      render json: { errors: user_submission.errors}, status: 422   
    end
  end

  private

  def submission_params
    params.require(:submission).permit(:title, :twitter, :github, :content, :repoName, :filePath, :entryTitle, :progress, :thoughts, :link, :tweet)
  end
end