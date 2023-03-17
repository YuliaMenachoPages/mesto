import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitter}) {
        super(popupSelector);
        this._submitter = submitter;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    open() {
        super.open();
    }

    close(evt) {
        super.close();
        this._popup.querySelector('.popup__form').reset();
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
                this.close();
            });
    }
}