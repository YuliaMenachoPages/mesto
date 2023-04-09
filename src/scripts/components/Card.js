export default class Card {
    constructor({
                    name,
                    link,
                    owner,
                    likes = [],
                    _id
                }, {handleCardClick}, handleLikeClick, handleDeleteIconClick, templateSelector, currentUserId) {
        this._landmark = name;
        this._link = link;
        this._owner = owner; // id владельца карточки
        this._likes = likes;
        this._id = _id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._currentUserId = currentUserId; // Id текущего пользователя
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._picture = this._element.querySelector('.element__picture');
        this._picture.src = this._link;
        this._picture.alt = "Фото. " + this._landmark;
        this._element.querySelector('.element__text').textContent = "" + this._landmark;
        this._setEventListeners();
        this.setLikes(this._likes);
        if (this._owner._id !== this._currentUserId) {
            this._element.querySelector('.element__delete_type_white').remove();
            this._element.querySelector('.element__delete_type_black').remove();
        }
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__icon').addEventListener('click', () => {
            this._handleLikeClick(this);
        });
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._handleDeleteIconClick(this);
        });
        this._element.querySelector('.element__picture').addEventListener('click', () => {
            this._handleCardClick({link: this._link, landmark: this._landmark});
        });
    }

    checkIfLiked() {
        return this._likes.some(user => user._id === this._currentUserId);
    }

    _countLikes() {
        const num = this._likes.length;

        function prettifyCounter(num) {
            if (num > 999999) {
                return (num / 1000000).toFixed() + 'M';
            } else if (num > 9999) {
                return (num / 1000).toFixed() + 'K';
            } else if (num > 999) {
                return (num / 1000).toFixed(1) + 'K';
            }
            return num;
        }

        this._element.querySelector('.element__counter').textContent = prettifyCounter(num);
    };

    setLikes(likes) {
        if (likes) {
            this._likes = likes;
            this.cardIsLiked = this.checkIfLiked();
        }

        const buttonLike = this._element.querySelector('.element__icon')
        this._countLikes();
        if (this.cardIsLiked) {
            buttonLike.classList.add('element__icon_active');
        } else {
            buttonLike.classList.remove('element__icon_active');
        }
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }
}
