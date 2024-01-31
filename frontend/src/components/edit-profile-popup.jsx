import { useContext, useEffect } from "react";
import PopupWithForm from "./popup-with-form";
import { CurrentUserContext } from "../contexts/current-user-context";
import { useForm } from "../hooks/use-form";

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({name: '', about: ''});

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isOpen} onSubmit={handleSubmit}>
      <input type="text" value={values.name} onChange={handleChange} className="form__input" placeholder="Имя" name="name" required minLength="2" maxLength="40" />
      <input type="text" value={values.about} onChange={handleChange} className="form__input" placeholder="О себе" name="about" required minLength="2" maxLength="200" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
