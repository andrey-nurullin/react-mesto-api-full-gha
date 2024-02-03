const { httpStatus } = require('./utils');

module.exports = class AuthError extends Error {
  constructor(message = 'Ошибка авторизации') {
    super(message);
    this.name = 'AuthError';
    this.statusCode = httpStatus.UNAUTHORIZED;
  }
}
