import { API } from "../api/api";

export default function getUserAvatarImageSrc(id: number) {
    return API.avatars.get(id).then((avatarSrc) => {
        return avatarSrc;
    });
}
