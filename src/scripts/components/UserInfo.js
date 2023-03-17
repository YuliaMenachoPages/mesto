export default class UserInfo {
    constructor({selectorName, selectorAbout}) {
        this._name = document.querySelector(selectorName);
        this._about = document.querySelector(selectorAbout);
    }

    getUserInfo(fullname, about) {
        fullname.value = this._name.textContent;
        about.value = this._about.textContent
    }

    setUserInfo(item) {
        this._name.textContent = item.fullname;
        this._about.textContent = item.about;
    }
}