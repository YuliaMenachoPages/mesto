export class FormValidator {
    constructor(selectors, popupElement) {
        this._inputSelector = selectors.inputSelector;
        this._fieldsetSelector = selectors.fieldsetSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;
        this._popupElement = popupElement;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._popupElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._popupElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _toggleButtonState(inputList, buttonElement, evt) {
        if (this._hasInvalidInput(inputList, evt)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;

        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._popupElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._popupElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
        this._popupElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
    }

    enableValidation() {
        const fieldsetList = Array.from(this._popupElement.querySelectorAll(this._fieldsetSelector));
        fieldsetList.forEach((fieldset) => {
            this._setEventListeners(fieldset);
            this._quitErrors();
        });
    }

    _quitErrors() {
        const errors = Array.from(this._popupElement.querySelectorAll(this._inputSelector));
        errors.forEach((error) => {
            this._hideInputError(error);
            const buttonToQuit = this._popupElement.querySelector(this._submitButtonSelector);
            buttonToQuit.classList.add(this._inactiveButtonClass);
            buttonToQuit.disabled = true;
        })
    }
}

