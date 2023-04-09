import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, {submitter}) {
        super(popupSelector);
        this._submitter = submitter;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit',
            (evt) => {
                evt.preventDefault();
                this._submitter(this._param);
            });
    }

    setParam(param) {
        this._param = param;
    }
}



