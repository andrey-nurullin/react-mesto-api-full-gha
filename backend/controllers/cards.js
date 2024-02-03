const Card = require('../models/card');
const {
  httpStatus, NotFoundError, ForbiddenError,
} = require('../utils/utils');

module.exports.getCards = (req, res, next) => Card.find({})
  .populate('likes').populate('owner')
  .then((cards) => res.send(cards))
  .catch(next);

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => newCard.populate('owner')
      .then((populatedCard) => res.status(httpStatus.CREATED).send(populatedCard)))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => new NotFoundError())
    .then((c) => {
      const ownerId = c.owner.toString();
      const isOwnCard = (req.user._id === ownerId);
      if (!isOwnCard) throw new ForbiddenError();
      Card.findByIdAndDelete(cardId)
        .orFail(() => new NotFoundError())
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .orFail(() => new NotFoundError())
  .populate('likes').populate('owner')
  .then((card) => res.send(card))
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .orFail(() => new NotFoundError())
  .populate('likes').populate('owner')
  .then((card) => res.send(card))
  .catch(next);
