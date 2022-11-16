import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../index";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../features/userInfoSlice";
import getUserAvatarImageSrc from "../../../utils/getUserAvatarImageSrc";
// @ts-ignore
import identicon from "identicon";
import { API } from "../../../api/api";

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
            .catch(() => {
                identicon.generate({ id: userInfo.login, size: 150 }, (err: any, buffer: string) => {
                    const blobAvatar: Blob = new Blob([new Buffer(buffer.slice(22), "base64")], {
                        type: "image/png",
                    });
                    API.avatars
                        .set(blobAvatar)
                        .then(() => {
                            window.location.reload();
                        })
                        .catch(() => {});
                });
            });
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
