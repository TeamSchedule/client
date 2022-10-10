import {API} from "../api/api";
import {AVATARS_STATIC_SERVER} from "../config/config";


export default function getUserAvatarImageSrc() {
    return API.avatars.get()
        .then(avatarSrc => {
            return `${AVATARS_STATIC_SERVER}/${avatarSrc}`;
        });
}
