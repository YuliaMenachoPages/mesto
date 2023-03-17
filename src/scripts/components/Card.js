export default class Card {
    constructor(cardData, templateSelector, {handleCardClick}) {
        this._landmark = cardData.landmark;
        this._link = cardData.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        this._setEventListeners();
        this._element.querySelector('.element__picture').src = this._link;
        this._element.querySelector('.element__picture').alt = "Фото. " + this._landmark;
        this._element.querySelector('.element__text').textContent = "" + this._landmark;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__icon').addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.element__picture').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    _toggleLike(evt) {
        const buttonLike = evt.target;
        buttonLike.classList.toggle('element__icon_active');
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
}
