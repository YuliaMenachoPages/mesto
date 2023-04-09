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
                    userInfo.queryUserInfo(res);
                    userInfo.setUserName();
                    userInfo.setUserActivity();
                })
                .finally(() => {
                    popupWithFormProfile.toggleButtonContent();
                    popupWithFormProfile.close();
                });
        }
    });

const popupWithFormAvatar = new PopupWithForm('.popup_type_profile-picture',
    {
        submitter: (item) => {
            popupWithFormAvatar.toggleButtonContent();
            api.changeUserAvatar(item)
                .then((res) => {
                    userInfo.queryUserInfo(res);
                    userInfo.setUserAvatar();
                    popupWithFormAvatar.close();
                })
                .finally(() => {
                    popupWithFormAvatar.toggleButtonContent();
                    popupWithFormAvatar.close();
                });
        }
    })

const handleLikeClick = (card) => {
    if (card.checkIfLiked()) {
        api.deleteLike(card._id).then((likes) => {
            card.setLikes(likes);
        });

    } else {
        api.addLike(card._id).then((likes) => {
            card.setLikes(likes)
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
                section.addItemReverse(cardElement)
            })
            .finally(() => {
                popupWithFormCard.toggleButtonContent();
                popupWithFormCard.close();
            });
    }
});

const profileFormValidator = new FormValidator(validationFields, popupProfileFieldset);
const cardFormValidator = new FormValidator(validationFields, popupCardFieldset);
const avatarFormValidator = new FormValidator(validationFields, popupAvatarFieldset);

//----ФУНКЦИИ----

Promise.all([
    api.getUserData(),
    api.getInitialCards(),
])
    .then(results => {
        userInfo.queryUserInfo(results[0]);
        userInfo.setUserName();
        userInfo.setUserActivity();
        userInfo.setUserAvatar();

        section.renderItems(results[1]);
    })
    .catch(err => console.error(err));

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

function createCard(cardData) {
    const popupWithImage = new PopupWithImage('.popup_type_image-container');
    const card = new Card(
        cardData, {
            handleCardClick: () => {
                popupWithImage.open(cardData.link, cardData.name)
            }
        },
        handleLikeClick, handleDeleteIconClick, '.cards-template', userInfo.id);

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
    nameInput.value = userInfoArray.name;
    jobInput.value = userInfoArray.about;
    popupWithFormProfile.open();
    profileFormValidator.resetErrors()
});

popupOnAvatar.addEventListener('click', () => {
    popupWithFormAvatar.open();
    avatarFormValidator.resetErrors();
})


//______________TEST______________


//     Перед зпросом не забудьте запустить прелодер,
//     то есть как-то отобразить в интерфейсе что запрос ушел и в данный момент ожидается его ответ (в ТЗ тоже об этом сказано).
// После ответа сервера (если он ок), вам надо заменить картинку на фронте и отключить прелодер, а затем закрыть попап

// const form = document.forms.search;
// const content = document.querySelector('.content');
// const result = document.querySelector('.content__result');
// const error = document.querySelector('.content__error');
// const spinner = document.querySelector('.spinner');
//
// function search(entity, entityId) {
//     return fetch(`https://swapi.nomoreparties.co/${entity}/${entityId}/`)
// }
//
// form.addEventListener('submit', function submit(e) {
//     e.preventDefault();
//     renderLoading(true);
//     search(form.elements.entity.value, form.elements.entityId.value)
//         .then((res) => {
//             if (res.ok) {
//                 return res.json();
//             }
//             return Promise.reject(res.status);
//         })
//         .then((res) => {
//             console.log(res);
//             renderResult(res.name);
//         })
//         .catch((err) => {
//             console.log(`Ошибка: ${err}`);
//             renderError(`Ошибка: ${err}`);
//         })
//         .finally(() => renderLoading(false));
// });
//
// function renderResult(text) {
//     result.textContent = text;
//     error.textContent = '';
// }
//
// function renderError(err) {
//     result.textContent = '';
//     error.textContent = err;
// }
//
// function renderLoading(isLoading) {
//     if (isLoading) {
//         spinner.classList.add('spinner_visible');
//         content.classList.add('content_hidden');
//     } else {
//         spinner.classList.remove('spinner_visible');
//         content.classList.remove('content_hidden');
//     }
// }