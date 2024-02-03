const { httpStatus } = require('./utils');

module.exports = class NotFoundError extends Error {
  constructor(message = 'Запрашиваемый ресурс не найден') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = httpStatus.NOT_FOUND;
  }
}
