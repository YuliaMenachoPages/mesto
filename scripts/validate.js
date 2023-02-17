const validationConst = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        fieldsetSelector: '.popup__fieldset',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
};

const showInputError = (popupElement, inputElement, errorMessage) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConst.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConst.errorClass);
};

const hideInputError = (popupElement, inputElement) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConst.inputErrorClass);
  errorElement.classList.remove(validationConst.errorClass);
  errorElement.textContent = '';
};


const checkInputValidity = (popupElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(popupElement, inputElement);
  }
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};


const toggleButtonState = (inputList, buttonElement, evt) => {
  if (hasInvalidInput(inputList, evt)) {
    buttonElement.classList.add(validationConst.inactiveButtonClass);
    buttonElement.disabled = true;

  } else {
    buttonElement.classList.remove(validationConst.inactiveButtonClass);
      buttonElement.disabled = false;
  }
};


const setEventListeners = (popupElement) => {
  const inputList = Array.from(popupElement.querySelectorAll(validationConst.inputSelector));
  const buttonElement = popupElement.querySelector(validationConst.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(popupElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationConst.formSelector));
  formList.forEach((popupElement) => {
    popupElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
const fieldsetList = Array.from(popupElement.querySelectorAll(validationConst.fieldsetSelector));
    fieldsetList.forEach((fieldset) => {
    setEventListeners(fieldset);
    });
})};

enableValidation();


