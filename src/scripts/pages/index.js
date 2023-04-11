import '../../pages/index.css';

import {
    popupProfileFieldset,
    popupOnProfile,
    nameInput,
    jobInput,
    popupCardFieldset,
    popupOnCard,
    popupAvatarFieldset,
    popupOnAvatar,
    validationFields,
} from '../utils/constants.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';


//----КОНСТАНТЫ----

const serverUrl = `https://mesto.nomoreparties.co/v1/cohort-63`;
const headers = {
    authorization: 'de07f66c-c750-40f7-a9ca-9c10f4545ed6',
    'Content-Type': 'application/json; charset=UTF-8'
};
const api = new Api({initialUrl: serverUrl, headers: headers});

const userInfo = new UserInfo({
    selectorName: '.profile__name',
    selectorAbout: '.profile__about',
    selectorAvatar: '.profile__picture',
});

const popupWithFormProfile = new PopupWithForm('.popup_type_profile',
    {
        submitter: (item) => {
            popupWithFormProfile.toggleButtonContent();
            api.changeUserData(item)
                .then((res) => {
                    userInfo.setUserInfo(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .then(() => {
                    popupWithFormProfile.close()
                })
                .finally(() => {
                    popupWithFormProfile.toggleButtonContent();
                });
        }
    });

const popupWithFormAvatar = new PopupWithForm('.popup_type_profile-picture',
    {
        submitter: (item) => {
            popupWithFormAvatar.toggleButtonContent();
            api.changeUserAvatar(item)
                .then((res) => {
                    userInfo.setUserInfo(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .then(() => {
                    popupWithFormAvatar.close()
                })
                .finally(() => {
                    popupWithFormAvatar.toggleButtonContent();
                });
        }
    })

const handleLikeClick = (card) => {
    if (card.checkIfLiked()) {
        api.deleteLike(card._id)
            .then((likes) => {
                card.setLikes(likes);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        api.addLike(card._id)
            .then((likes) => {
                card.setLikes(likes)
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

const handleFormSubmit = (card) => {
    api.deleteCard(card._id)
        .then(() => {
            card.deleteCard();
            popupWithConfirmation.close();
        })
}

const popupWithConfirmation = new PopupWithConfirmation('.popup_type_confirmation',
    {submitter: handleFormSubmit});
const handleDeleteIconClick = (card) => {
    popupWithConfirmation.setParam(card);
    popupWithConfirmation.open();
}

const section = new Section({
    renderer: (cardData) => {
        const cardElement = createCard(cardData);
        section.addItem(cardElement)
    }
}, '.elements__container');

const popupWithFormCard = new PopupWithForm('.popup_type_card', {
    submitter: (item) => {
        popupWithFormCard.toggleButtonContent();
        api.addCard({name: item.landmark, link: item.link})
            .then((cardData) => {
                const cardElement = createCard(cardData);
                section.addItemReverse(cardElement);
            })
            .catch((err) => {
                console.log(err);
            })
            .then(() => {
                popupWithFormCard.close()
            })
            .finally(() => {
                popupWithFormCard.toggleButtonContent();
            });
    }
});

const popupWithImage = new PopupWithImage('.popup_type_image-container');
const profileFormValidator = new FormValidator(validationFields, popupProfileFieldset);
const cardFormValidator = new FormValidator(validationFields, popupCardFieldset);
const avatarFormValidator = new FormValidator(validationFields, popupAvatarFieldset);

//----ФУНКЦИИ----

Promise.all([
    api.getUserData(),
    api.getInitialCards(),
])
    .then(results => {
        userInfo.setUserInfo(results[0]);
        section.renderItems(results[1]);
    })
    .catch((err) => {
        console.error(err)
    });

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

popupWithFormAvatar.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithConfirmation.setEventListeners();
popupWithImage.setEventListeners();

function createCard(cardData) {
    const card = new Card(
        cardData, {
            handleCardClick: () => {
                popupWithImage.open(cardData.link, cardData.name)
            }
        },
        handleLikeClick, handleDeleteIconClick, '.cards-template', userInfo.queryUserInfo());
    const cardElement = card.generateCard();
    return cardElement;
}

//----СЛУШАТЕЛИ----

popupOnCard.addEventListener('click', () => {
    popupWithFormCard.open();
    cardFormValidator.resetErrors();
});

popupOnProfile.addEventListener('click', () => {
    const userInfoArray = userInfo.getUserInfo();
    console.log(userInfoArray);
    nameInput.value = userInfoArray.name;
    jobInput.value = userInfoArray.about;
    popupWithFormProfile.open();
    profileFormValidator.resetErrors()
});

popupOnAvatar.addEventListener('click', () => {
    popupWithFormAvatar.open();
    avatarFormValidator.resetErrors();
})

