import React, { useEffect, useState } from "react";
import { UserIcon } from "../../svg";
import styles from "./UsernameInput.module.scss";

interface UsernameInputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
    isOk?: boolean;
    className?: string;
}

export default function UsernameInput(props: UsernameInputProps) {
    const [isOkClassname, setIsOkClassname] = useState("");

    useEffect(() => {
        if (props.isOk !== undefined) {
            setIsOkClassname(props.isOk ? styles.usernameInputWrapper__success : styles.usernameInputWrapper__error);
        }
    }, [props.isOk]);

    return (
        <div className={[styles.usernameInputWrapper, isOkClassname, props.className ? props.className : ""].join(" ")}>
            <UserIcon className="ml-1 mt-2" size={28} color={"black"} />
            <input
                className={styles.usernameInput}
                type="text"
                placeholder="Имя пользователя"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
}
