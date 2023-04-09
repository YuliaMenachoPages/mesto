export default class UserInfo {
    constructor({selectorName, selectorAbout, selectorAvatar}) {
        this._nameField = document.querySelector(selectorName);
        this._aboutField = document.querySelector(selectorAbout);
        this._avatarField = document.querySelector(selectorAvatar);
    }

    queryUserInfo({name, about, avatar, _id}) {
        this._name = name;
        console.log(this._name);
        this._about = about;
        this._avatar = avatar;
        this.id = _id;
    }

    getUserInfo() {
        return {
            name: this._name,
            about: this._about,
        }
    }

    setUserName() {
        this._nameField.textContent = this._name;
    }

    setUserActivity() {
        this._aboutField.textContent = this._about;
    }

    setUserAvatar() {
        this._avatarField.src = this._avatar;
    }
}


