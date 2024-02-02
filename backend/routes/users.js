const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateUser, getUserInfo,
} = require('../controllers/users');
const { URL_PATTERN } = require('../utils/utils');

userRouter.get('/me', getUserInfo);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).required(),
  }),
}), getUserById);

userRouter.get('/', getUsers);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URL_PATTERN).required(),
  }),
}), updateUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_PATTERN).required(),
    email: Joi.string().email(),
    _id: Joi.string().alphanum().length(24).required(),
  }),
}), updateUser);

module.exports = userRouter;
