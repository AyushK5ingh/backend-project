// Utility class to standardize API responses
// includes statusCode, message, data, and success properties
// used to send consistent responses from API endpoints
// success is true for all responses created with this class
// default statusCode is 200, default message is 'success', default data is an empty object
// can be instantiated with custom values for statusCode, message, and data
// example: new ApiResponse(201, 'Resource created', { id: 1 })

class ApiResponse {
    constructor(statusCode = 200, message = 'success', data = {}) {
        this.statusCode = statusCode<400;
        this.message = message;
        this.data = data;
        this.success = statusCode<400;
    }
}

export { ApiResponse };