import { useRef } from "react";
import PopupWithForm from "./popup-with-form";

function EditAvatarPopup(props) {

  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={avatarRef} type="url" className="form__input" placeholder="Ссылка на картинку" name="avatar" required />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
