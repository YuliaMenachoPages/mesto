
//  Popup
let popup = document.querySelector('.popup');

// Переменные обработки формы Submit
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-field_type_fullname');
let jobInput = document.querySelector('.popup__form-field_type_about');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

// Переменные открытия Popup
let popupOn = document.querySelector('.profile__edit-button');

// Переменные закрытия Popup
let popupOff = document.querySelector('.popup__close');

//Открытие Popup, запись данных
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = name.textContent;
    jobInput.value = about.textContent;
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
   name.textContent = (nameInput.value);
   about.textContent = (jobInput.value);

//Закрытие Popup
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); //Отправка формы и закрытие Popup