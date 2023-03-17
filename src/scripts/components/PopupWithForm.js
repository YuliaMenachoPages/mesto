import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import {validationFields} from '../utils/constants.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitter}) {
        super(popupSelector);
        this._submitter = submitter;
        this._popupForm = this._popup.querySelector('.popup__form');
        this.formValidator = new FormValidator(validationFields, this._popupForm);
    }

    open() {
        super.open();
        this.formValidator.resetErrors();
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
                evt.target.reset();
            });
    }
}