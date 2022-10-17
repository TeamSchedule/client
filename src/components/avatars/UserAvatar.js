import Avatar from "@mui/material/Avatar";
import React from "react";

export default function UserAvatar({ avatarSrc, size, className }) {
    /*
     * Компонент аватара ползователя.
     * */
    return (
        <>
            <Avatar
                src={avatarSrc.length > 0 ? avatarSrc : ""}
                sx={{ width: size, height: size }}
                className={className}
            />
        </>
    );
}
