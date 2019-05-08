class Request
    def self.where(resource_path, query = {}, options = {})
    response, status = get_json(resource_path, query)
    status == 200 ? response : errors(response)
    end

    def self.get(id)
    response, status = get_json(id)
    status == 200 ? response : errors(response)
    end

    def self.errors(response)
    error = { errors: { status: response["status"], message: response["message"] } }
    response.merge(error)
    end

    def self.get_json(root_path, query = {})
    query_string = query.map{|k,v| "#{k}=#{v}"}.join("&")
    path = query.empty?? root_path : "#{root_path}?#{query_string}"
    response = api.get(path)
    [JSON.parse(response.body), response.status]
    end

    def self.api
    Connection.api
    end
end