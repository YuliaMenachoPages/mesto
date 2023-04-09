import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitter}) {
        super(popupSelector);
        this._submitter = submitter;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__button');
    }

    close(evt) {
        super.close();
        this._popupForm.reset();
    }

    _getInputValues() {
        const formObject = Object.fromEntries(new FormData(this._popupForm));
        return formObject;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit',
            (evt) => {
                evt.preventDefault();
                this._submitter(this._getInputValues());
            });
    }

    toggleButtonContent() {
        const buttonContent = this._submitButton.innerText;
        if (buttonContent === 'Сохранить') {
            this._submitButton.innerText = 'Сохранение...';
        }
        if (buttonContent === 'Сохранение...') {
            this._submitButton.innerText = 'Сохранить';
        }
        if (buttonContent === 'Создать') {
            this._submitButton.innerText = 'Создание...';
        }
        if (buttonContent === 'Создание...') {
            this._submitButton.innerText = 'Создать';
        }
    }
}