const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/utils');
const AuthError = require('../utils/AuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError());
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new AuthError());
  }
  req.user = payload;
  next();
};
