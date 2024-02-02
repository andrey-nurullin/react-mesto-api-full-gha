// eslint-disable-next-line max-classes-per-file
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const SECRET_KEY = (NODE_ENV === 'production') ? JWT_SECRET : 'dev_secret';

const URL_PATTERN = /^(https?):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/;

const httpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const generateToken = (payload) => jwt.sign(
  payload,
  SECRET_KEY,
  { expiresIn: '7d' },
);

class NotFoundError extends Error {
  constructor(message = 'Запрашиваемый ресурс не найден') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = httpStatus.NOT_FOUND;
  }
}

class AuthError extends Error {
  constructor(message = 'Ошибка авторизации') {
    super(message);
    this.name = 'AuthError';
    this.statusCode = httpStatus.UNAUTHORIZED;
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Недостаточно прав') {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = httpStatus.FORBIDDEN;
  }
}

module.exports = {
  httpStatus, NotFoundError, AuthError, ForbiddenError, generateToken, SECRET_KEY, URL_PATTERN,
};
