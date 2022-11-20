import React from "react";
import styles from "./BaseAvatar.module.scss";
import { ImageIcon } from "../../svg";

export interface BaseAvatarProps {
    imgSrc: string;
    size: number;
    teamColor?: string;
    className?: string;
    availableForEditing?: boolean;
    onClick?: () => void;
}

export default function BaseAvatar(props: BaseAvatarProps) {
    const BaseImage = () => (
        <img
            src={props.imgSrc}
            width={props.size}
            height={props.size}
            className={[styles.baseAvatar, props.className || ""].join(" ")}
            style={{ borderColor: props.teamColor }}
            alt=""
        />
    );

    if (!props.availableForEditing) {
        return <BaseImage />;
    }

    return (
        <div className={styles.editableAvatarWrapper} onClick={props.onClick}>
            <ImageIcon size={32} className={styles.imageIcon} color={"#6e6e6e"} />
            <div className={styles.layer} style={{ width: props.size, height: props.size }}></div>
            <BaseImage />
        </div>
    );
}
