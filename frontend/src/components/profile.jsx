import { useContext } from "react";
import { CurrentUserContext } from "../contexts/current-user-context";
import { AppContext } from "../contexts/app-context";

function Profile() {
  const user = useContext(CurrentUserContext);
  const {handleEditProfileClick, handleAddPlaceClick, handleEditAvatarClick} = useContext(AppContext);

  return (
    <section className="profile">
      <button className="profile__avatar-edit-button" type="button" onClick={handleEditAvatarClick}>
        <div className="profile__avatar-edit-overlay" />
        <img src={user?.avatar} alt="Аватар пользователя" className="profile__avatar" />
      </button>
      <div className="profile__info">
        <div className="profile__title-wrapper">
          <h1 className="profile__title text-overflow-protect">{user?.name}</h1>
          <button className="profile__edit-button hover-on-react" type="button" aria-label="Редактировать данные профиля" onClick={handleEditProfileClick} />
        </div>
        <p className="profile__subtitle text-overflow-protect">{user?.about}</p>
      </div>
      <button className="profile__add-card-button hover-on-react" type="button" aria-label="Добавить место" onClick={handleAddPlaceClick} />
    </section>
  )
}

export default Profile;
