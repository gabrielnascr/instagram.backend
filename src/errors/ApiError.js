class ApiError {
  constructor(code, message) {
    this.message = message;
    this.code = code;
  }
}
// Is this class doing anything besides receiving data? what is the return?
// Take a look at this Method in the Erro object: Error.captureStackTrace(this);
// Also, read this: https://stackoverflow.com/questions/59625425/understanding-error-capturestacktrace-and-stack-trace-persistance
export default ApiError;
