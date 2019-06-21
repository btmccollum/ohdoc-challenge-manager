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
      TwitterApi::SendTweet.call(submission_params[:tweet], current_user)

      user_submission.tap do |submission|
        submission.title = "#100DOC Tweet"
        submission.twitter = true 
        submission.content = submission_params[:tweet]
      end
    elsif params[:service] == "github"
      # creating content markdown blurb to add to user's existing log md file on github
      content = "### #{submission_params[:entryTitle]}\n\n **Today's Progress:** #{submission_params[:progress]}\n\n **Thoughts:** #{submission_params[:thoughts]}\n\n **Link(s):** #{submission_params[:link]}\n "

      # need to pass in user agent, the title, content to be appended, and current user for access to tokens
      GithubApi::UpdateMarkdownFile.call('OHDOC Challenge Manager', submission_params[:entryTitle], content, current_user)
      
      # setting github specific data
      user_submission.tap do |submission|
        submission.title = submission_params[:entryTitle]
        submission.github = true 
        submission.content = content
      end
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