import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(containerSelector) {
        super(containerSelector);
        this._popupPicture = this._popup.querySelector('.popup__picture');
        this._popupText = this._popup.querySelector('.popup__text');
    }

    open(link, landmark) {
        super.open();
        this._popupPicture.src = link;
        this._popupPicture.alt = "Фото. " + landmark;
        this._popupText.textContent = "" + landmark;
    }
}