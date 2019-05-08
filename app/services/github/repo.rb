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
  
    def initialize(args = {})
        super(args)
        binding.pry
    end
  end
end