class ApiError {
  constructor(code, message) {
    this.message = message;
    this.code = code;
  }
}
// Is this class doing anything besides receiving data? what is the return?
export default ApiError;
