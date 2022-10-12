import Avatar from "@mui/material/Avatar";
import React from "react";

export default function UserAvatar({ avatarSrc, width = 50, height = 50, alt = "", className }) {
    /*
     * Компонент аватара ползователя.
     * */
    return (
        <>
            <Avatar
                alt={alt}
                src={avatarSrc.length > 0 ? avatarSrc : ""}
                sx={{ width: width, height: height }}
                className={className}
            />
        </>
    );
}
