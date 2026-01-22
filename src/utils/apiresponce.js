class ApiResponse {
    constructor(statusCode = 200, message = 'success', data = {}) {
        this.statusCode = statusCode<400;
        this.message = message;
        this.data = data;
        this.success = true;
    }
}

export { ApiResponse };