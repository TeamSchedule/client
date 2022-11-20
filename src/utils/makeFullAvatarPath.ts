import { AVATARS_STATIC_SERVER } from "../config/config";

export default function makeFullAvatarPath(src: string) {
    return AVATARS_STATIC_SERVER + "/" + src;
}
