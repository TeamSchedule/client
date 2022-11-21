import BaseAvatar, { BaseAvatarProps } from "../BaseAvatar/BaseAvatar";
import makeFullAvatarPath from "../../../utils/makeFullAvatarPath";

interface UserAvatarProps extends BaseAvatarProps {}

export default function UserAvatar(props: UserAvatarProps) {
    /*
     * Компонент аватара ползователя.
     * */
    return (
        <>
            <BaseAvatar
                imgSrc={props.imgSrc.length > 0 ? makeFullAvatarPath(props.imgSrc) : ""}
                size={props.size}
                className={props.className}
                availableForEditing={props.availableForEditing}
                onClick={props.onClick}
            />
        </>
    );
}
