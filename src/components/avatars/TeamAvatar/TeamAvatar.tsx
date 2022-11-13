import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TeamAvatar.module.scss";
import BaseAvatar from "../BaseAvatar";
import { BaseAvatarProps } from "../BaseAvatar/BaseAvatar";

interface TeamAvatarProps extends BaseAvatarProps {}

export default function TeamAvatar(props: TeamAvatarProps) {
    /*
     * Компонент аватара команды.
     * */
    const navigate = useNavigate();

    return (
        <>
            <BaseAvatar
                imgSrc={props.imgSrc}
                size={props.size}
                teamColor={props.teamColor}
                className={styles.teamAvatar}
                availableForEditing={props.availableForEditing}
                onClick={() => navigate("avatar")}
            />
        </>
    );
}
