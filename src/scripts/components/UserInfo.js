export default class UserInfo {
    constructor({selectorName, selectorAbout}) {
        this._name = document.querySelector(selectorName);
        this._about = document.querySelector(selectorAbout);
    }

    getUserInfo() {
        const userInfoArray = {
            name: this._name.textContent,
            about: this._about.textContent,
        }
        return userInfoArray
    }

    setUserInfo(item) {
        this._name.textContent = item.fullname;
        this._about.textContent = item.about;
    }
}