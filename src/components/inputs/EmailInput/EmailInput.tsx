import React, { useEffect, useState } from "react";
import { EmailIcon } from "../../svg";
import styles from "./EmailInput.module.scss";

interface EmailInputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
    isOk?: boolean;
    className?: string;
}

export default function EmailInput(props: EmailInputProps) {
    const [isOkClassname, setIsOkClassname] = useState("");

    useEffect(() => {
        if (props.isOk !== undefined) {
            setIsOkClassname(props.isOk ? styles.EmailInputWrapper__success : styles.EmailInputWrapper__error);
        } else {
            setIsOkClassname("");
        }
    }, [props.isOk, props.value]);

    return (
        <div className={[styles.EmailInputWrapper, isOkClassname, props.className ? props.className : ""].join(" ")}>
            <EmailIcon className="ml-1 mt-2 my-auto" size={26} color={"black"} />
            <input
                className={styles.EmailInput}
                type="email"
                placeholder="Электронная почта"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
}
