class AppError extends Error {
  constructor() {
    super();
  }
  create(errorMessage, errorStatusCode, errorStatusText) {
    this.errorMessage = errorMessage;
    this.errorStatusCode = errorStatusCode;
    this.errorStatusText = errorStatusText;
    return this;
  }
}
module.exports = new AppError();
