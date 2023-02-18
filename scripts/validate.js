const validationFields = {
    formSelector: '.popup__form',
    formOpenedSelector: '.popup_opened',
    inputSelector: '.popup__input',
    fieldsetSelector: '.popup__fieldset',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

const showInputError = (fields, popupElement, inputElement, errorMessage) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(fields.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(fields.errorClass);
};

const hideInputError = (fields, popupElement, inputElement) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(fields.inputErrorClass);
    errorElement.classList.remove(fields.errorClass);
    errorElement.textContent = '';
};


const checkInputValidity = (fields, popupElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(fields, popupElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(fields, popupElement, inputElement);
    }
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};


const toggleButtonState = (fields, inputList, buttonElement, evt) => {
    if (hasInvalidInput(inputList, evt)) {
        buttonElement.classList.add(fields.inactiveButtonClass);
        buttonElement.disabled = true;

    } else {
        buttonElement.classList.remove(fields.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};
const setEventListeners = (fields, popupElement) => {
    const inputList = Array.from(popupElement.querySelectorAll(fields.inputSelector));
    const buttonElement = popupElement.querySelector(fields.submitButtonSelector);
    toggleButtonState(fields, inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(fields, popupElement, inputElement);
            toggleButtonState(fields, inputList, buttonElement);
        });
    });
};


const enableValidation = (fields) => {
    const formList = Array.from(document.querySelectorAll(fields.formSelector));
    formList.forEach((popupElement) => {
        popupElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(popupElement.querySelectorAll(fields.fieldsetSelector));
        fieldsetList.forEach((fieldset) => {
            setEventListeners(fields, fieldset);
        });
    })
};

enableValidation(validationFields);

function quitErrors(fields, popupElement) {
    const errors = Array.from(popupElement.querySelectorAll(fields.inputSelector));
    errors.forEach(function (error) {
        hideInputError(fields, popupElement, error);
        const buttonToQuit = popupElement.querySelector(fields.submitButtonSelector);
        buttonToQuit.classList.add(fields.inactiveButtonClass);
        buttonToQuit.disabled = true;
    });
}