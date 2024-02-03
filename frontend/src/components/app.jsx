import { useEffect, useState } from 'react';
import Header from './header';
import Main from './main';
import Footer from './footer';
import ImagePopup from './image-popup';
import EditProfilePopup from './edit-profile-popup';
import EditAvatarPopup from './edit-avatar-popup';
import AddCardPopup from './add-card-popup';
import DeleteCardPopup from './delete-card-popup';
import contentApi from '../utils/content-api';
import * as authApi from '../utils/auth-api';
import { CurrentUserContext } from '../contexts/current-user-context';
import { CardsListContext } from '../contexts/cards-list-context'
import { CardEventsContext } from '../contexts/card-events-context';
import { AppContext } from '../contexts/app-context';
import InfoTooltip from './info-tooltip';
import { useNavigate } from 'react-router-dom';

function App() {
  const TOOLTIP_DISPLAY_INTERVAL = 2000;

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [cardIdToDelete, setCardIdToDelete] = useState('');
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState({ isSuccess: false, tooltip: ''})
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const initialLoggedState = Boolean(localStorage.getItem('auth_token'));
  const [isLogged, setIsLogged] = useState( initialLoggedState );
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const handleAddCard = (card) => {
    function makeRequest() {
      return contentApi.addCard(card)
        .then((newCard) => setCards([newCard, ...cards]))
    }
    handleSubmit(makeRequest);
  }

  const handleUpdateAvatar = (avatarData) => {
    function makeRequest() {
      return contentApi.updateAvatar(avatarData).then(setCurrentUser)
    }
    handleSubmit(makeRequest);
  }

  const handleUpdateUser = (userInfo) => {
    function makeRequest() {
      return contentApi.setUserInfo(userInfo).then(setCurrentUser)
    }
    handleSubmit(makeRequest);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(userWhoLiked => (userWhoLiked._id === currentUser._id));
    contentApi.changeLikeStatus(card._id, !isLiked)
      .then((updatedCard) => {
        setCards(
          (state) => state.map(
            (c) => (c._id === card._id) ? updatedCard : c
          )
        )
      })
      .catch(console.error);
  }

  const handleDeleteClick = (cardId) => {
    setIsDeletePopupOpen(true);
    setCardIdToDelete(cardId);
  }

  const handleCardDelete = (cardId) => {
    function makeRequest() {
      return contentApi.deleteCard(cardId)
        .then(() => setCards(
            (state) => state.filter(
              (c) => (c._id !== cardId)
            )
          ))
    }
    handleSubmit(makeRequest);
  }

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const showErrorTooltip = (text) => {
    setInfoTooltip({
      isSuccess: false,
      tooltip: text
    });
    showInfoTooltip();
  }

  const showSuccessTooltip = (text) => {
    setInfoTooltip({
      isSuccess: true,
      tooltip: text
    });
    showInfoTooltip();
  }

  const showInfoTooltip = () => {
    setIsInfoTooltipPopupOpen(true);
    const popupHidingTimer = setTimeout(() => {
      setIsInfoTooltipPopupOpen(false);
      clearTimeout(popupHidingTimer);
    }, TOOLTIP_DISPLAY_INTERVAL);
  }

  const handleRegistrationSuccess = (res) => {
    showSuccessTooltip('Вы успешно зарегистрировались!');
    navigate('/signin');
  }

  const handleRegistrationError = (err) => {
    showErrorTooltip('Что-то пошло не так! Попробуйте ещё раз.');
    console.error(err);
  }

  const handleLoginError = (err) => {
    showErrorTooltip('Ошибка авторизации. Проверьте введенные данные.');
    console.error(err);
  }

  const handleRegister = ({email, password}) => {
    setIsLoading(true);
    authApi.register(email, password)
      .then(handleRegistrationSuccess)
      .catch(handleRegistrationError)
      .finally(() => {
        setIsLoading(false);
      });
  }

  const setUserAsLogged = (email) => {
    setIsLogged(true);
    setEmail(email);
    navigate('/');
  }

  const handleAuthorization = (authToken) => {
    authApi.getUserData(authToken)
      .then((userData) => {
        setUserAsLogged(userData.email);
      })
      .catch(console.error);
  }

  const handleLoginSuccess = (response, email) => {
    if (!response.authToken) throw new Error('Отсутствует токен');
    localStorage.setItem('auth_token', response.authToken);
    setUserAsLogged(email);
  }

  const handleLogin = ({email, password}) => {
    setIsLoading(true);
    authApi.login(email, password)
      .then((res) => {
        handleLoginSuccess(res, email);
      })
      .catch(handleLoginError)
      .finally(() => setIsLoading(false));
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLogged(false);
    navigate('/signin');
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  const tryToAuthorize = () => {
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      handleAuthorization(authToken)
    }
  }

  useEffect(() => {
    tryToAuthorize();
  }, [])

  useEffect(() => {
    if (!isLogged) return;
    Promise.all([contentApi.getUserInfo(), contentApi.getInitialCards()])
    .then(([userInfo, cards]) => {
      setCurrentUser(userInfo);
      setCards(cards.reverse());
    })
    .catch(console.error);
  }, [isLogged])

  return (
    <AppContext.Provider value={{ isLoading, isLogged, closeAllPopups, handleEditProfileClick, handleAddPlaceClick, handleEditAvatarClick, handleRegister, handleLogin, handleLogout }}>
      <CurrentUserContext.Provider value={currentUser}>
        <CardsListContext.Provider value={cards}>
          <CardEventsContext.Provider value={{handleCardClick, handleCardLike, handleDeleteClick}}>
            <div className="page">
              <div className="page__content">
                <Header email={email}/>
                <Main />
                <Footer />
              </div>
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser}/>
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar}/>
              <AddCardPopup isOpen={isAddPlacePopupOpen} onCardSubmit={handleAddCard}/>
              <DeleteCardPopup isOpen={isDeletePopupOpen} onConfirmSubmit={() => handleCardDelete(cardIdToDelete)}/>
              <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} />
              <InfoTooltip isOpen={isInfoTooltipPopupOpen} isSuccess={infoTooltip.isSuccess} tooltip={infoTooltip.tooltip}/>
            </div>
          </CardEventsContext.Provider>
        </CardsListContext.Provider>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
