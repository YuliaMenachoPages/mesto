export default class Card {
    constructor(cardData, templateSelector, {handleCardClick}) {
        this._landmark = cardData.landmark;
        this._link = cardData.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        // this._picture = this._element.querySelector('.element__picture');
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
        this._picture = this._element.querySelector('.element__picture');
        this._picture.src = this._link;
        this._picture.alt = "Фото. " + this._landmark;
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
            this._handleCardClick({link: this._link, landmark: this._landmark});
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
