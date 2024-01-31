const BASE_URL = 'https://auth.nomoreparties.co';
const apiAuthToken = 'ea1b6130-dab4-493a-93c8-8c94cc2df993';
const apiCohortId = 'cohort-74';

const apiConfig = {
  baseUrl: `https://mesto.nomoreparties.co/v1/${apiCohortId}`,
  headers: {
    authorization: apiAuthToken,
    'Content-Type': 'application/json'
  }
}

const cssFormData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
}

export {
  cssFormData, apiConfig, BASE_URL
};
