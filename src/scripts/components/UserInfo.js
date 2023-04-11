export default class UserInfo {
    constructor({selectorName, selectorAbout, selectorAvatar}) {
        this.nameContent = document.querySelector(selectorName);
        this.aboutContent = document.querySelector(selectorAbout);
        this.avatarContent = document.querySelector(selectorAvatar);
    }

    queryUserInfo() {
        return this._id;
    }

    getUserInfo() {
        return {
            name: this.nameContent.textContent,
            about: this.aboutContent.textContent,
            avatar: this.avatarContent.src,
        }
    }

    setUserInfo({name = this.nameContent.textContent, about = this.aboutContent.textContent, avatar = this.avatarContent.src, _id}) {
        this.nameContent.textContent = name;
        this.aboutContent.textContent = about;
        this.avatarContent.src = avatar;
        this._id = _id;
    }
}


