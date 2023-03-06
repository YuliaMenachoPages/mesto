import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//Общие переменные
const closeButtons = document.querySelectorAll('.popup__close');

// Переменные для редактирования профиля
const popupProfile = document.querySelector('.popup_type_profile');
const popupOnProfile = document.querySelector('.profile__edit-button');
const formElementProfile = popupProfile.querySelector('.popup__form_type_profile');
// Обработка формы Submit
const nameInput = popupProfile.querySelector('.popup__input_type_fullname');
const jobInput = popupProfile.querySelector('.popup__input_type_about');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');

// Переменные для создания карточек
const initialCards = [
    {
        landmark: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        landmark: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        landmark: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        landmark: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        landmark: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        landmark: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const popupCard = document.querySelector('.popup_type_card');
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
    fieldsetSelector: '.popup__fieldset',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};
//...Функции...

//Закрытие Popup по Esc
function keyHandler(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

//Закрытие по клику вне Popup

function closePopupByClick(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popupOpened);
    }
}

//Открытие Popup
const openPopup = (elem) => {
    elem.classList.add('popup_opened');

    document.addEventListener('keydown', keyHandler);
    document.addEventListener('click', closePopupByClick);
}

//Закрытие Popup
function closePopup(elem) {
    elem.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler);
    document.removeEventListener('click', closePopupByClick);
}

//Закрытие без сохранения
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

//Функции редактирования профиля
//Открытие, запись данных
function openPopupProfile() {
    nameInput.value = name.textContent;
    jobInput.value = about.textContent;
    openPopup(popupProfile);
    new FormValidator(validationFields, popupProfile).enableValidation();
}

popupOnProfile.addEventListener('click', openPopupProfile);

// Обработка формы Submit и закрытия Popup
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    name.textContent = (nameInput.value);
    about.textContent = (jobInput.value);
    closePopup(popupProfile);
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile); //Отправка формы и закрытие Popup

//Функции добавления карточек

const openImageContainer = (link, landmark, evt) => {
    popupPicture.setAttribute('src', link);
    popupPicture.setAttribute('alt', ("Фото. " + landmark));
    popupText.textContent = "" + landmark;
    if (evt.target.classList.contains('element__picture')) {
        openPopup(popupImageContainer);
    }
}
initialCards.forEach((item) => {
    const card = new Card(item, '.cards-template', openImageContainer);
    const cardElement = card.generateCard();
    cardElementsContainer.prepend(cardElement);
});

//Открытие
function openPopupCard() {
    openPopup(popupCard);
    new FormValidator(validationFields, popupCard).enableValidation();
}

popupOnCard.addEventListener('click', openPopupCard);

// Обработка формы Submit и закрытия Popup
function handleFormSubmitCard(evt) {
    evt.preventDefault();
    const landmark = landmarkInput.value;
    const link = linkInput.value;
    const card = new Card({landmark: landmark, link: link}, '.cards-template', openImageContainer);
    cardElementsContainer.prepend(card.generateCard());
    closePopup(popupCard);
    evt.target.reset();
}

formElementCard.addEventListener('submit', handleFormSubmitCard);








