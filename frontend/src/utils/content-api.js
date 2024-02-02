import { BASE_URL, apiConfig } from "./utils";

class ContentApi {

  getUserInfo() {
    return this._doRequest('/users/me');
  }

  setUserInfo(data) {
    return this._doRequest('/users/me', 'PATCH', data);
  }

  getInitialCards() {
    return this._doRequest('/cards');
  }

  addCard(data) {
    return this._doRequest('/cards', 'POST', data);
  }

  deleteCard(cardId) {
    return this._doRequest(`/cards/${cardId}`, 'DELETE');
  }

  changeLikeStatus(cardId, isLike) {
    const action = isLike ? 'PUT' : 'DELETE';
    return this._doRequest(`/cards/${cardId}/likes`, action);
  }

  updateAvatar(data) {
    return this._doRequest('/users/me/avatar', 'PATCH', data);
  }

  /**
   * @param {String} dataUrl Url path to requested data
   * @param {String} method
   * @param {JSON} data
   * @returns {Promise}
   */
  _doRequest(dataUrl, method, data) {
    return fetch(BASE_URL + dataUrl, {
      method: method,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Api error with status ${response.status}`);
    })
  }
}

const contentApi = new ContentApi();

export default contentApi;
