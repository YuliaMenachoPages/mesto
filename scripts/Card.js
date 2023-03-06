export class Card {
    constructor(item, templateSelector, openImageContainer) {
        this._landmark = item.landmark;
        this._link = item.link;
        this._templateSelector = templateSelector;
        this._openImageContainer = openImageContainer;
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

        this._element.querySelector('.element__picture').setAttribute('src', this._link);
        this._element.querySelector('.element__picture').setAttribute('alt', ("Фото. " + this._landmark));
        this._element.querySelector('.element__text').textContent = "" + this._landmark;

        return this._element;
    }

    _setEventListeners() {

        this._element.addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });

        this._element.addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
        this._element.addEventListener('click', (evt) => {
            this._openImageContainer(this._link, this._landmark, evt);
        });

    }

    _toggleLike(evt) {
        const _like = evt.target;
        if (_like.classList.contains('element__icon')) {
            _like.classList.toggle('element__icon_active');
        }
    }

    _deleteCard(evt) {
        const _trash = evt.target;
        if (_trash.classList.contains('element__delete')) {
            this._element.remove();
        }
    }
}
