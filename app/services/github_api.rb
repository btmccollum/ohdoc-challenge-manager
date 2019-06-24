require "base64"

module GithubApi
  class UpdateMarkdownFile < ApplicationService
    # attr_reader :content, :title, :progress, :thoughts, :link
    attr_reader :title, :content

    # def initialize(user_agent, title, content, progress, thoughts, link, current_user)
    def initialize(user_agent, title, content, current_user)
        @user_agent = user_agent
        @title = title
        @content = content
        @current_user = current_user
    end

    def call
      @api = Faraday.new("https://api.github.com/repos/#{@current_user.github_username}/#{@current_user.github_repo_path}")
      sha_and_contents = self.get_sha_and_contents
      formatted_content = self.format_content(sha_and_contents[:content])
      commit_message = self.format_commit(@title, sha_and_contents[:sha], formatted_content)
      
      # sending put request to append new content to existing md log file 
      edit_file = @api.put do |req|
        req.headers['User-Agent'] = "#{@user_agent}"
        req.headers['Authorization'] = "token #{@current_user.github_token}"
        req.body = commit_message
      end
    end

    # necessary to pull a repo's sha in order to submit updates
    # in future this would be beneficial to persist to DB 
    def get_sha_and_contents
      repo_req = @api.get do |req|
        req.headers['User-Agent'] = "#{@user_agent}"
        req.headers['Authorization'] = "token #{@current_user.github_token}"
      end

      repo_contents = JSON.parse(repo_req.body)['content']
      repo_sha = JSON.parse(repo_req.body)['sha']
      return { sha: repo_sha, content: repo_contents }      
    end

    # github content is base64 encoded and must be received as such
    # decoding existing content to then append the new content and re encode it
    def format_content(old_content)
      file_content = Base64.decode64(old_content) << @content
      return new_file_content = Base64.encode64(file_content)
    end

    def format_commit(title, repo_sha, new_content)
      return data = { message: "Adding log for: #{title}", sha: "#{repo_sha}", content: "#{new_content}" }.to_json
    end
  end
end