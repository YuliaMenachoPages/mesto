export default class Api {
    constructor({initialUrl, headers}) {
        this.initialUrl = initialUrl;
        this.headers = headers;
    }

    getInitialCards() {
        //     получить список всех карточек в виде массива (GET)
        return fetch(`${this.initialUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

//добавить карточку (POST)
    addCard(cardData) {
        return fetch(`${this.initialUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link,
            }),
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    // добавить лайк карточки (PUT)
    addLike(cardId) {
        return fetch(`${this.initialUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {
                return res["likes"]
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

// удалить лайк карточки (DELETE)
    deleteLike(cardId) {
        return fetch(`${this.initialUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {
                return res["likes"]
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

//удалить карточку (DELETE)
    deleteCard(cardId) {
        return fetch(`${this.initialUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

// получить данные пользователя (GET)
    getUserData() {
        return fetch(`${this.initialUrl}/users/me`, {
            method: 'GET',
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

// заменить данные пользователя (PATCH)
    changeUserData({fullname, about}) {
        return fetch(`${this.initialUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: fullname,
                about: about,
            }),
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

// заменить аватар (PATCH)
    changeUserAvatar({link}) {
        return fetch(`${this.initialUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: link,
            }),
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }
}


