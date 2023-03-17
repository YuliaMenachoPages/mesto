import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(item, containerSelector) {
        super(containerSelector);
        this._link = item.link;
        this._landmark = item.landmark;
        this._popupPicture = this._popup.querySelector('.popup__picture');
        this._popupText = this._popup.querySelector('.popup__text');
    }

    open() {
        super.open();
        this._popupPicture.src = this._link;
        this._popupPicture.alt = "Фото. " + this._landmark;
        this._popupText.textContent = "" + this._landmark;
    }
}