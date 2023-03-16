// 1)Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
//    2) Принимает в конструктор объект с селекторами двух элементов:
//    элемента имени пользователя и элемента информации о себе.
//   3)  Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
//   Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
//   4)  Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.


export default class UserInfo {
    constructor({selectorName, selectorAbout}) {
        this._name = document.querySelector(selectorName);
        this._about = document.querySelector(selectorAbout);
    }

    getUserInfo() {
         const userData = {
            name:  this._name.textContent,
            about: this._about.textContent,
        };
        return userData;
    }

    setUserInfo(nameInputValue, aboutInputValue) {
            this._name.textContent = nameInputValue;
            this._about.textContent = aboutInputValue;
        }
}