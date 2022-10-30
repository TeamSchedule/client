import React, { useEffect, useState } from "react";
import { UserAvatar } from "./";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userInfoSlice";
import getUserAvatarImageSrc from "../../utils/getUserAvatarImageSrc";

interface PersonalAvatarProps {
    size: number;
}
export default function PersonalAvatar({ size }: PersonalAvatarProps) {
    /*
     * Компонент персонального аватара ползователя.
     * */
    const userInfo = useSelector(selectUserInfo);
    const [avatarURL, setAvatarURL] = useState("");

    useEffect(() => {
        getUserAvatarImageSrc(+userInfo.id)
            .then(setAvatarURL)
            .catch(() => {});
    }, [userInfo.id]);

    return (
        <>
            <UserAvatar avatarSrc={avatarURL.length > 0 ? avatarURL : ""} size={size} />
        </>
    );
}
