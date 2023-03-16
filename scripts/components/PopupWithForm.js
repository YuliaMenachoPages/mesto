// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
//     1) Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
//   2)  Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
//    3) Перезаписывает родительский метод setEventListeners.
//     Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
//     но и добавлять обработчик сабмита формы.
//     4) Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
//   5)  Для каждого попапа создавайте свой экземпляр класса PopupWithForm.

import Popup from "./Popup.js";
//import FormValidator from "../FormValidator.js";

const validationFields = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitter}) {
        super(popupSelector);
        this._submitter = submitter;
        this._popupForm = this._popup.querySelector('.popup__form');
 //       const popupFieldset = this._popup.querySelector('.popup__fieldset');
  //      this.formValidator = new FormValidator(validationFields, popupFieldset);
    }

    open() {
        super.open();
  //      this.formValidator.resetErrors();
    }

    _getInputValues() {
         const formObject = Object.fromEntries(new FormData(this._popupForm));
         return formObject;
    }

    setEventListeners() {
        super.setEventListeners();
         this._popupForm.addEventListener('submit',
            (evt) => {
                evt.preventDefault();
                console.log("hello");
             //   this._submitter(this._getInputValues());
                this.close();
                evt.target.reset();
            });
    }
}