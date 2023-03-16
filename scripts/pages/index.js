import {initialCards} from '../constCards.js';
import Card from '../Card.js';
// import FormValidator from '../FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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


//Переменные для валидации
const validationFields = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

//const profileFormValidator = new FormValidator(validationFields, popupProfileFieldset);
//profileFormValidator.enableValidation();

//const cardFormValidator = new FormValidator(validationFields, popupCardFieldset);
//cardFormValidator.enableValidation();

 const renderer = (cardData) => {
     const card = new Card(cardData, '.cards-template', {
         handleCardClick: () => {
             const popupWithImage = new PopupWithImage(cardData, '.popup_type_image-container');
             popupWithImage.open();
         }
     });
     const cardElement = card.generateCard();
     cardList.addItem(cardElement);
 }

const cardList = new Section({
    items: initialCards, renderer}, '.elements__container');

cardList.renderItems();


function test() {
    console.log('test');
}

const popupWithFormProfile = new PopupWithForm('.popup_type_profile', test);
const userInfo = new UserInfo({selectorName: '.profile__name', selectorAbout: '.profile__about'});

popupOnProfile.addEventListener('click', (evt) => {
    popupWithFormProfile.open(evt);
    userInfo.getUserInfo()
});


const popupWithFormCard = new PopupWithForm('.popup_type_card', {
    submitter: (item) => {renderer(item);
    console.log('test');}
});
popupOnCard.addEventListener('click', () => {
popupWithFormCard.open();
});