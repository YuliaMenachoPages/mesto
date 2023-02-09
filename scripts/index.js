//Общие переменные
const closeButtons = document.querySelectorAll('.popup__close');

// Переменные для редактирования профиля
const popupProfile = document.querySelector('.popup_type_profile');
const popupOnProfile = document.querySelector('.profile__edit-button');
const formElementProfile = popupProfile.querySelector('.popup__form_type_profile');
// Обработка формы Submit
const nameInput = popupProfile.querySelector('.popup__form-field_type_fullname');
const jobInput = popupProfile.querySelector('.popup__form-field_type_about');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');

// Переменные для добавления карточек
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
const landmarkInput = popupCard.querySelector('.popup__form-field_type_landmark');
const linkInput = popupCard.querySelector('.popup__form-field_type_link');
const cardsTemplate = document.querySelector('.cards-template').content.querySelector('.element');
const cardElementsContainer = document.querySelector('.elements__container');

// Переменные для просмотра фото
const popupImageContainer = document.querySelector('.popup_type_image-container');
const popupPicture = popupImageContainer.querySelector('.popup__picture');
const popupText = popupImageContainer.querySelector('.popup__text');


//...Функции...

//Открытие Popup
function openPopup(elem) {
    elem.classList.add('popup_opened');
    elem.style.animation = "fadeIn 0.3s forwards";
}

//Закрытие Popup
function closePopup(elem) {
    elem.style.animation = "fadeOut 0.3s forwards"

    function removeOpened(elem) {
        elem.classList.remove('popup_opened');
    }

    setTimeout(removeOpened, 300, elem);
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
//Открытие
function openPopupCard() {
    openPopup(popupCard);
}

popupOnCard.addEventListener('click', openPopupCard);

//Создание карточки
function createCard(item) {
    const card = cardsTemplate.cloneNode(true);
    const cardPicture = card.querySelector('.element__picture');
    const cardText = card.querySelector('.element__text');

    //Функции заполнения данными
    function setLink(elem) {
        elem.setAttribute('src', item.link);
    }

    function setAlt(elem) {
        elem.setAttribute('alt', ("Фото. " + item.landmark));
    }

    function setText(elem) {
        elem.textContent = "" + item.landmark;
    }

    setLink(cardPicture);
    setAlt(cardPicture);
    setText(cardText);
    //Функция переключения лайков
    const like = card.querySelector('.element__icon');

    function toggleLike() {
        like.classList.toggle('element__icon_active');
    }

    like.addEventListener('click', toggleLike);
    //Функция удаления карточки
    const trash = card.querySelector('.element__delete');
    trash.addEventListener('click', () => {
        card.remove();
    });

    //Функция открытия просмотра карточки
    function openImageContainer() {
        openPopup(popupImageContainer);
        setLink(popupPicture);
        setAlt(popupPicture);
        setText(popupText);
    }

    cardPicture.addEventListener('click', openImageContainer);
    return card;

}

//Отрисовка карточек
function renderCards(items) {
    const cards = items.map((item) => {
        return createCard(item);
    });
    cardElementsContainer.prepend(...cards);

}

renderCards(initialCards);

// Обработка формы Submit и закрытия Popup
function handleFormSubmitCard(evt) {
    evt.preventDefault();
    const landmark = landmarkInput.value;
    const link = linkInput.value;
    const card = createCard({landmark: landmark, link: link});
    cardElementsContainer.prepend(card);
    closePopup(popupCard);
    evt.target.reset();
}

formElementCard.addEventListener('submit', handleFormSubmitCard);












