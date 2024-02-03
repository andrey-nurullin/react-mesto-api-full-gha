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

module.exports = {
  httpStatus, generateToken, SECRET_KEY, URL_PATTERN,
};
