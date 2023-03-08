import {initialCards} from './constCards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//Общие переменные

const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupList = document.querySelectorAll('.popup');

// Переменные для редактирования профиля

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileFieldset = popupProfile.querySelector('.popup__fieldset_type_profile');
const popupOnProfile = document.querySelector('.profile__edit-button');
const formElementProfile = popupProfile.querySelector('.popup__form_type_profile');
// Обработка формы Submit
const nameInput = popupProfile.querySelector('.popup__input_type_fullname');
const jobInput = popupProfile.querySelector('.popup__input_type_about');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');

// Переменные для создания карточек

const popupCard = document.querySelector('.popup_type_card');
const popupCardFieldset = document.querySelector('.popup__fieldset_type_card');
const popupOnCard = document.querySelector('.profile__add-button');
const formElementCard = popupCard.querySelector('.popup__form_type_card');
//Обработка формы Submit
const landmarkInput = popupCard.querySelector('.popup__input_type_landmark');
const linkInput = popupCard.querySelector('.popup__input_type_link');
const cardElementsContainer = document.querySelector('.elements__container');

// Переменные для просмотра фото
const popupImageContainer = document.querySelector('.popup_type_image-container');
const popupPicture = popupImageContainer.querySelector('.popup__picture');
const popupText = popupImageContainer.querySelector('.popup__text');

//Переменные для валидации
const validationFields = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};
const profileFormValidator = new FormValidator(validationFields, popupProfileFieldset);
const cardFormValidator = new FormValidator(validationFields, popupCardFieldset);

//---Функции---

///Вспомогательные функции

//Закрытие Popup по Esc
function handleClosePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

//Закрытие по клику вне Popup

function closePopupByClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
}

//Установщик слушателей
function setOverlayClickEventListeners(popups) {
    popups.forEach((popup) => {
        popup.addEventListener('click', closePopupByClick);
    });
}

//Открытие Popup
function openPopup(elem) {
    elem.classList.add('popup_opened');
    document.addEventListener('keydown', handleClosePopupByEsc);
}

//Закрытие Popup
function closePopup(elem) {
    elem.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleClosePopupByEsc);
}


///Функции редактирования профиля

//Валидация
profileFormValidator.enableValidation();

//Открытие, запись данных
function openPopupProfile() {
    nameInput.value = name.textContent;
    jobInput.value = about.textContent;
    openPopup(popupProfile);
    profileFormValidator.resetErrors(popupProfile);
}

// Обработка формы Submit и закрытия Popup
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    name.textContent = (nameInput.value);
    about.textContent = (jobInput.value);
    closePopup(popupProfile);
}


///Функции добавления карточек

//Валидация
cardFormValidator.enableValidation();

//Создание карточки

function createNewCard(cardData) {
    const card = new Card(cardData, '.cards-template', openImageContainer);
    const cardElement = card.generateCard();
    return cardElement;
}

const openImageContainer = (link, landmark) => {
    popupPicture.src = link;
    popupPicture.alt = "Фото. " + landmark;
    popupText.textContent = "" + landmark;
    openPopup(popupImageContainer);
}
initialCards.forEach((cardData) => {
    cardElementsContainer.prepend(createNewCard(cardData));
});

//Открытие
function openPopupCard() {
    openPopup(popupCard);
    cardFormValidator.resetErrors();
}

// Обработка формы Submit и закрытия Popup
function handleFormSubmitCard(evt) {
    evt.preventDefault();
    const landmark = landmarkInput.value;
    const link = linkInput.value;
    cardElementsContainer.prepend(createNewCard({landmark, link}));
    closePopup(popupCard);
    evt.target.reset();
}


//---Обработчики ---

setOverlayClickEventListeners(popupList);

//Закрытие без сохранения
popupCloseButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

///Обработчики редактирования профиля
popupOnProfile.addEventListener('click', openPopupProfile);
formElementProfile.addEventListener('submit', handleFormSubmitProfile);

///Обработчики карточек
popupOnCard.addEventListener('click', openPopupCard);
formElementCard.addEventListener('submit', handleFormSubmitCard);








