import Avatar from "@mui/material/Avatar";
import React from "react";

export default function UserAvatar({ avatarSrc, size, alt = "", className }) {
    /*
     * Компонент аватара ползователя.
     * */
    return (
        <>
            <Avatar
                alt={alt}
                src={avatarSrc.length > 0 ? avatarSrc : ""}
                sx={{ width: size, height: size }}
                className={className}
            />
        </>
    );
}
