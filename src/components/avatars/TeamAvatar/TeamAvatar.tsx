import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TeamAvatar.module.scss";
import BaseAvatar from "../BaseAvatar";
import { BaseAvatarProps } from "../BaseAvatar/BaseAvatar";
import makeFullAvatarPath from "../../../utils/makeFullAvatarPath";

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
                imgSrc={props.imgSrc.length > 0 ? makeFullAvatarPath(props.imgSrc) : ""}
                size={props.size}
                teamColor={props.teamColor}
                className={styles.teamAvatar}
                availableForEditing={props.availableForEditing}
                onClick={() => navigate("avatar")}
            />
        </>
    );
}
