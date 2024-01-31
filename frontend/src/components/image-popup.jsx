import Popup from './popup';

function ImagePopup({card, isOpen}) {
  return (
    <Popup name="image" isOpen={isOpen}>
        <figure className="img-with-caption">
          <img className="img-with-caption__full-img" src={card?.link} alt="Полное фото" />
          <figcaption className="img-with-caption__caption">{card?.name}</figcaption>
        </figure>
    </Popup>
  );
}

export default ImagePopup;
