import React, { useEffect, useState } from "react";
import { PasswordIcon } from "../../svg";
import styles from "./PasswordInput.module.scss";

interface PasswordInputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
    isOk?: boolean;
    className?: string;
}

export default function PasswordInput(props: PasswordInputProps) {
    const [isOkClassname, setIsOkClassname] = useState("");

    useEffect(() => {
        if (props.isOk !== undefined && props.value.length > 0) {
            setIsOkClassname(props.isOk ? styles.passwordInputWrapper__success : styles.passwordInputWrapper__error);
        }
    }, [props.isOk]);

    return (
        <div className={[styles.passwordInputWrapper, isOkClassname, props.className ? props.className : ""].join(" ")}>
            <PasswordIcon className="ml-1 mt-2 my-auto" size={28} color={"black"} />
            <input
                className={styles.passwordInput}
                type="password"
                placeholder={props.placeholder || "Пароль"}
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
}
