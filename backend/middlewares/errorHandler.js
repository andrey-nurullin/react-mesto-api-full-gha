const { httpStatus } = require('../utils/utils');

module.exports = (err, req, res, next) => {
  const {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR,
    message = 'Ошибка сервера',
  } = err;

  res.status(statusCode).send({ message });
  next();
};
