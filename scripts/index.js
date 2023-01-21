//  Popup
let popup = document.querySelector('.popup');

// Переменные открытия Popup
let popupOn = document.querySelector('.profile__edit-button');

// Переменные закрытия Popup
let popupOff = document.querySelector('.popup__close');

// Переменные обработки формы Submit
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-field_type_fullname');
let jobInput = document.querySelector('.popup__form-field_type_about');

//Открытие Popup
function openPopup() {
    popup.classList.add('popup_opened');
}

popupOn.addEventListener('click', openPopup);

//Закрытие Popup
function closePopup() {
    popup.classList.remove('popup_opened');
}

popupOff.addEventListener('click', closePopup);

// Обработка формы Submit и закрытия Popup
function handleFormSubmit(evt) {
    evt.preventDefault(); // Отмена стандартной отправки формы.

    //Перезапись данных
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');

    let name = document.querySelector('.profile__name');
    let about = document.querySelector('.profile__about');

    name.textContent = (nameInput.value);
    about.textContent = (jobInput.value);

//Закрытие Popup
    function closePopup() {
        popup.classList.remove('popup_opened');
    }

    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); //Отправка формы и закрытие Popup