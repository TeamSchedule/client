import BaseAvatar, { BaseAvatarProps } from "../BaseAvatar/BaseAvatar";

interface UserAvatarProps extends BaseAvatarProps {}

export default function UserAvatar(props: UserAvatarProps) {
    /*
     * Компонент аватара ползователя.
     * */
    return (
        <>
            <BaseAvatar
                imgSrc={props.imgSrc}
                size={props.size}
                className={props.className}
                availableForEditing={props.availableForEditing}
                onClick={props.onClick}
            />
        </>
    );
}
