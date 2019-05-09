module Github
  class Repo < Base
    attr_accessor :name, 
                    :path,
                    :sha,
                    :content, 
                    :encoding,
                    :url

    def self.find(username, repo_name, path)
        response = Request.get("repos/#{username}/#{repo_name}/contents/#{path}")
        Repo.new(response)
    end

    # takes repo returned from #find and the content to be added
    # content_string must be Base64 encoded string
    def self.update_file(repo, content_string)
      response = Request.post(repo.path, content_string)
      Repo.new(response)
    end
  
    def initialize(args = {})
        super(args)
        binding.pry
    end
  end
end