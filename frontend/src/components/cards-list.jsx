import { useContext } from 'react';
import Card from './card';
import { CardsListContext } from '../contexts/cards-list-context';

function CardsList() {

  const cards = useContext(CardsListContext);

  return (
    <section className="gallery" aria-label="Фотогалерея разных мест пользователя">
      <ul className="cards-grid">
        {cards.map(card => (
          <Card key={card._id} card={card} />
        ))}
      </ul>
    </section>
  )
}

export default CardsList;
