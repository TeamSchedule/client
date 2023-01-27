import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../index";
import getUserAvatarImageSrc from "../../../utils/getUserAvatarImageSrc";
// @ts-ignore
import identicon from "identicon";
import { API } from "../../../api/api";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { AuthUserKey } from "../../../consts/common";

interface PersonalAvatarProps {
    size: number;
    availableForEditing?: boolean;
}

export default function PersonalAvatar(props: PersonalAvatarProps) {
    /*
     * Компонент персонального аватара ползователя.
     * */
    const navigate = useNavigate();

    const [user, _] = useLocalStorage(AuthUserKey);
    const [avatarURL, setAvatarURL] = useState("");

    useEffect(() => {
        getUserAvatarImageSrc(+user.id)
            .then(setAvatarURL)
            .catch(() => {
                if (!user.id) return;
                identicon.generate({ id: user.id.toString(), size: 150 }, (err: any, buffer: string) => {
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
    }, [user.id]);

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
