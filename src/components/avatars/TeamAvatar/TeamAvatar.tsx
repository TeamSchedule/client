import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TeamAvatar.module.scss";
import BaseAvatar from "../BaseAvatar";
import { BaseAvatarProps } from "../BaseAvatar/BaseAvatar";
import { API } from "../../../api/api";
import { AVATARS_STATIC_SERVER } from "../../../config/config";


interface TeamAvatarProps extends BaseAvatarProps {
    teamId?: string;
}

export default function TeamAvatar(props: TeamAvatarProps) {
    /*
     * Компонент аватара команды.
     * */
    const navigate = useNavigate();

    return (
        <>
            <BaseAvatar
                imgSrc={`${AVATARS_STATIC_SERVER}/${props.imgSrc}`}
                size={props.size}
                teamColor={props.teamColor}
                className={styles.teamAvatar}
                availableForEditing={props.availableForEditing}
                onClick={() => navigate("avatar")}
            />
        </>
    );
}
