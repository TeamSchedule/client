import BaseAvatar from "../BaseAvatar/BaseAvatar";
import makeFullAvatarPath from "../../../utils/makeFullAvatarPath";

interface UserAvatarProps {
    fullImgSrc?: string;
    imgSrc?: string;
    size: number;
    teamColor?: string;
    className?: string;
    availableForEditing?: boolean;
    onClick?: () => void;
}

export default function UserAvatar(props: UserAvatarProps) {
    /*
     * Компонент аватара ползователя.
     * */
    const src = props.fullImgSrc || makeFullAvatarPath(props.imgSrc || "");

    return (
        <>
            <BaseAvatar
                imgSrc={src}
                size={props.size}
                className={props.className}
                availableForEditing={props.availableForEditing}
                onClick={props.onClick}
            />
        </>
    );
}
