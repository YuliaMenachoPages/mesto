export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this.setEventListeners();
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        });
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        const button = this._popup.querySelector('.popup__close');
        button.addEventListener('click', () => this.close());
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
        document.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt);
        });
    }
}