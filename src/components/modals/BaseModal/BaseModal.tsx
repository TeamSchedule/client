import styles from "./BaseModal.module.scss";
import React from "react";

interface BaseModalProps {
    title: string;
    children: React.ReactElement;
    onCloseClickHandler?: () => void;
}

export default function BaseModal(props: BaseModalProps) {
    return (
        <>
            <div className={styles.baseModalWrapper}>
                <div className={styles.baseModal}>
                    <h2 className={styles.baseModalTitle}>{props.title}</h2>
                    <button
                        type="button"
                        className={["btn-close", styles.baseModalCloseIcon].join(" ")}
                        aria-label="Close"
                        onClick={props.onCloseClickHandler}
                    ></button>
                    {props.children}
                </div>
            </div>
        </>
    );
}
