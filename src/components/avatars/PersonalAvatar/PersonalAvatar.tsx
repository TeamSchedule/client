import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../index";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../features/userInfoSlice";
import getUserAvatarImageSrc from "../../../utils/getUserAvatarImageSrc";

interface PersonalAvatarProps {
    size: number;
    availableForEditing?: boolean;
}

export default function PersonalAvatar(props: PersonalAvatarProps) {
    /*
     * Компонент персонального аватара ползователя.
     * */
    const navigate = useNavigate();

    const userInfo = useSelector(selectUserInfo);
    const [avatarURL, setAvatarURL] = useState("");

    useEffect(() => {
        getUserAvatarImageSrc(+userInfo.id)
            .then(setAvatarURL)
            .catch(() => {});
    }, [userInfo.id]);

    return (
        <>
            <UserAvatar
                imgSrc={avatarURL.length > 0 ? avatarURL : ""}
                size={props.size}
                availableForEditing={props.availableForEditing}
                onClick={() => navigate("avatar")}
            />
        </>
    );
}
