import { useContext } from "react";
import { CurrentUserContext } from "../contexts/current-user-context";
import { CardEventsContext } from "../contexts/card-events-context";


function Card({ card }) {
  const likesCount = card.likes.length;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = (card.owner._id === currentUser._id);
  const isLiked = card.likes.some(userWhoLiked => (userWhoLiked._id === currentUser._id));
  const cardLikeButtonClassName = (
    `cards-grid__like-button ${isLiked && 'cards-grid__like-button_active'}`
  );

  const cardEvents = useContext(CardEventsContext);

  const handleCardClick = () => {
    cardEvents.handleCardClick(card);
  }

  const handleLikeClick = () => {
    cardEvents.handleCardLike(card);
  }

  const handleDelete = () => {
    cardEvents.handleDeleteClick(card._id);
  }

  return(
    <li className="cards-grid__card">
      {isOwn && <button className="cards-grid__delete-button hover-on-react" type="button" onClick={handleDelete}/>}
      <img className="cards-grid__card-photo" src={card.link} alt={card.name} onClick={handleCardClick} />
      <div className="cards-grid__caption-wrapper">
        <h2 className="cards-grid__card-caption text-overflow-protect">{card.name}</h2>
        <div className="cards-grid__like-section">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
          <div className="cards-grid__like-counter">{likesCount}</div>
        </div>
      </div>
    </li>
  )
}

export default Card;
