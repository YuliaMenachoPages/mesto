let popup=document.querySelector('.popup');
let popupOn=document.querySelector('.profile__edit-button');
let popupOff=document.querySelector('.popup__close');
let popupSaveButton=document.querySelector('.popup__button');


popupOn.addEventListener('click', function openPopup() {
    popup.classList.add('popup_opened');
})
popupOff.addEventListener('click', function closePopup() {
    popup.classList.remove('popup_opened');
})
popupSaveButton.addEventListener('click', function closePopup() {
    popup.classList.remove('popup_opened');
})

let formElement=document.querySelector('.popup__form');
    let nameInput=document.querySelector('.popup__fullname');
    let jobInput=document.querySelector('.popup__about');

    function handleFormSubmit (evt) {
        evt.preventDefault();
        nameInput.getAttribute('value');
        jobInput.getAttribute('value');
        let name=document.querySelector('.profile__name');
        let about=document.querySelector('.profile__about');
name.textContent = (nameInput.value);
about.textContent = (jobInput.value);
    }
formElement.addEventListener('submit', handleFormSubmit);