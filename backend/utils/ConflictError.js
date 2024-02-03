const { httpStatus } = require("./utils");

const DATA_DUPLICATE_ERROR = 11000;

class ConflictError extends Error {
  constructor(message = 'Запись уже существует') {
    super(message);
    this.name = 'DuplicateError';
    this.statusCode = httpStatus.CONFLICT;
  }
}

module.exports = { DATA_DUPLICATE_ERROR, ConflictError }
