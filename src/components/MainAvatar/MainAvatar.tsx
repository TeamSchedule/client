import React from "react";
import { Avatar } from "@mui/material";
import { AVATARS_STATIC_SERVER } from "../../api/config";

function makeAvatarURL(path: string | undefined | null) {
    return AVATARS_STATIC_SERVER + path;
}

interface MainAvatarProps {
    size: number;
    placeholder?: string;
    src?: string;
    fullPath?: boolean;
}

export default function MainAvatar(props: MainAvatarProps) {
    /*
     * Компонент для аватара ползователя или команды (юнита, отдела).
     * */
    return (
        <>
            <Avatar alt="" src={props.fullPath ? props.src : makeAvatarURL(props.src)}>
                {props.placeholder || ""}
            </Avatar>
        </>
    );
}