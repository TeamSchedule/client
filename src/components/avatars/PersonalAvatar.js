import React, { useEffect, useState } from "react";
import UserAvatar from "./UserAvatar";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userInfoSlice";
import getUserAvatarImageSrc from "../../utils/getUserAvatarImageSrc";

export default function PersonalAvatar({ size }) {
    /*
     * Компонент персонального аватара ползователя.
     * */
    const userInfo = useSelector(selectUserInfo);
    const [avatarURL, setAvatarURL] = useState("");

    useEffect(() => {
        getUserAvatarImageSrc(userInfo.id)
            .then(setAvatarURL)
            .catch(() => {});
    }, [userInfo.id]);

    return (
        <>
            <UserAvatar
                avatarSrc={avatarURL.length > 0 ? avatarURL : ""}
                size={size}
                alt={userInfo.username}
            />
        </>
    );
}
