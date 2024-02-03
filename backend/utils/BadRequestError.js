const { httpStatus } = require('./utils');

module.exports = class BadRequestError extends Error {
  constructor(message = 'Некорректные данные') {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = httpStatus.BAD_REQUEST;
  }
};
