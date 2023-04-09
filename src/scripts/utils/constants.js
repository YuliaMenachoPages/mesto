export {
    popupProfileFieldset,
    popupOnProfile,
    nameInput,
    jobInput,
    popupCardFieldset,
    popupOnCard,
    popupAvatarFieldset,
    popupOnAvatar,
    validationFields,
}

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileFieldset = popupProfile.querySelector('.popup__fieldset_type_profile');
const popupOnProfile = document.querySelector('.profile__edit-button');
// Обработка формы Submit
const nameInput = popupProfile.querySelector('.popup__input_type_fullname');
const jobInput = popupProfile.querySelector('.popup__input_type_about');

// Переменные для создания карточек

const popupCardFieldset = document.querySelector('.popup__fieldset_type_card');
const popupOnCard = document.querySelector('.profile__add-button');// Переменные для создания карточек

// Переменные для изменения аватара

const popupAvatarFieldset = document.querySelector('.popup__fieldset_type_profile-picture');
const popupOnAvatar = document.querySelector('.profile__avatar-button');


//Переменные для валидации
const validationFields = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};