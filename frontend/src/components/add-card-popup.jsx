import PopupWithForm from "./popup-with-form";
import { useForm } from "../hooks/use-form";

function AddCardPopup({ isOpen, onClose, onCardSubmit }) {

  const {values, handleChange} = useForm({name: '', link: ''});

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardSubmit(values);
  }

  return (
    <PopupWithForm name="add-card" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input value={values.name} onChange={handleChange} type="text" className="form__input" placeholder="Название" name="name" required minLength="2" maxLength="30" />
      <input value={values.link} onChange={handleChange} type="url" className="form__input" placeholder="Ссылка на картинку" name="link" required />
    </PopupWithForm>
  )
}

export default AddCardPopup;
