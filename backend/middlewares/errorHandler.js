const { httpStatus } = require('../utils/utils');

const DATA_DUPLICATE_ERROR = 11000;

module.exports = (err, req, res, next) => {
  let {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR,
    message = 'Ошибка сервера',
  } = err;

  if (err.code === DATA_DUPLICATE_ERROR) {
    statusCode = httpStatus.CONFLICT;
    message = 'Запись уже существует';
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = httpStatus.BAD_REQUEST;
    message = 'Некорректные данные';
  }

  res.status(statusCode).send({ message });
  next();
};
