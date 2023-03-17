import '../../pages/index.css';

import {
    popupProfileFieldset,
    popupOnProfile,
    nameInput,
    jobInput,
    popupCardFieldset,
    popupOnCard,
    validationFields
} from '../utils/constants.js'
import {initialCards} from '../utils/constCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


//----КОНСТАНТЫ----

const renderer = (cardData) => {
    const card = new Card(cardData, '.cards-template', {
        handleCardClick: () => {
            const popupWithImage = new PopupWithImage('.popup_type_image-container');
            popupWithImage.open(cardData.link, cardData.landmark);
        }
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
}
const cardList = new Section({
    items: initialCards, renderer
}, '.elements__container');
const userInfo = new UserInfo({selectorName: '.profile__name', selectorAbout: '.profile__about'});
const popupWithFormProfile = new PopupWithForm('.popup_type_profile', {submitter: (item) => userInfo.setUserInfo(item)});
const popupWithFormCard = new PopupWithForm('.popup_type_card', {submitter: (item) => renderer(item)});
const profileFormValidator = new FormValidator(validationFields, popupProfileFieldset);
const cardFormValidator = new FormValidator(validationFields, popupCardFieldset);


//----ФУНКЦИИ----

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
cardList.renderItems();


//----СЛУШАТЕЛИ----

popupOnCard.addEventListener('click', () => {
    popupWithFormCard.open();
    cardFormValidator.resetErrors();
});
popupOnProfile.addEventListener('click', (evt) => {
    const userInfoArray = userInfo.getUserInfo();
    nameInput.value = userInfoArray.name;
    jobInput.value = userInfoArray.about;
    popupWithFormProfile.open();
    profileFormValidator.resetErrors()
});