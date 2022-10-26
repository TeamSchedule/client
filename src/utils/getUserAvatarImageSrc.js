import { API } from "../api/api";
import { AVATARS_STATIC_SERVER } from "../config/config";

export default function getUserAvatarImageSrc(id) {
    return API.avatars.get(id).then((avatarSrc) => {
        return `${AVATARS_STATIC_SERVER}/${avatarSrc}`;
    });
}
