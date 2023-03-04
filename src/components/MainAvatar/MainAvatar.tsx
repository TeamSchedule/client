import React from "react";
import { Avatar } from "@mui/material";
import { AVATARS_STATIC_SERVER } from "../../api/config";
import SkeletonWrapper from "../SkeletonWrapper";

function makeAvatarURL(path: string | undefined | null) {
    return AVATARS_STATIC_SERVER + path;
}

interface MainAvatarProps {
    placeholder?: string;
    src?: string;
    fullPath?: boolean;
    size?: number;
}

export default function MainAvatar(props: MainAvatarProps) {
    /*
     * Компонент для аватара ползователя или команды (юнита, отдела).
     * */
    const baseAvatarSize: number = 48;

    if (!props.src) {
        return (
            <>
                <SkeletonWrapper variant="circular">
                    <Avatar />
                </SkeletonWrapper>
            </>
        );
    }
    return (
        <>
            <Avatar
                alt=""
                src={props.fullPath ? props.src : makeAvatarURL(props.src)}
                sx={{ width: props.size || baseAvatarSize, height: props.size || baseAvatarSize }}
            >
                {props.placeholder || ""}
            </Avatar>
        </>
    );
}
