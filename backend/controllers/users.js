const bcrypt = require('bcrypt');
const User = require('../models/user');
const {
  httpStatus, generateToken, NotFoundError, AuthError,
} = require('../utils/utils');

const SALT_ROUNDS = 10;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let userId;
  User.findOne({ email })
    .orFail(() => new AuthError())
    .select('+password')
    .then((user) => {
      userId = user._id.toString();
      return bcrypt.compare(password, user.password);
    })
    .then((match) => {
      if (!match) throw new AuthError();
      const token = generateToken({ _id: userId });
      res.status(httpStatus.OK).send({ authToken: token });
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(httpStatus.CREATED).send(user)))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true, runValidators: true })
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};
