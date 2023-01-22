import { AVATARS_STATIC_SERVER } from "../api/config";

export default function makeFullAvatarPath(src: string) {
    return AVATARS_STATIC_SERVER + "/" + src;
}
