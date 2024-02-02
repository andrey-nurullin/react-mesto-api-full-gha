const jwt = require('jsonwebtoken');
const { SECRET_KEY, AuthError } = require('../utils/utils');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('authorization: ' + authorization);
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
