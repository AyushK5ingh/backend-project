// error handling class
// custom error class
// extends the built-in Error class
// adds statusCode and errors properties
// captures stack trace
// used to represent API errors in a standardized way
class ApiError extends Error {
    constructor(message= 'something went wrong', statusCode, errors =[],stack="") {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.message = message;
        this.success = false;

        if (stack) {
            this.stack = stack;

        }else{
            Error.captureStackTrace(this, this.constructor);
        }

    }
}

export { ApiError };