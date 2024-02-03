const { httpStatus } = require("./utils");

module.exports = class ForbiddenError extends Error {
  constructor(message = 'Недостаточно прав') {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = httpStatus.FORBIDDEN;
  }
}
