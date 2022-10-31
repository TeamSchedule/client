import React from "react";
import { UserIcon, PasswordIcon, EmailIcon } from "../svg";
import styles from "./Auth.module.scss";

interface InputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
}

interface AuthPasswordInputProps extends InputProps {}
export function AuthPasswordInput(props: AuthPasswordInputProps) {
    return (
        <div className={styles.divinp}>
            <PasswordIcon className="ml-1 mt-2 my-auto" size={28} color={"black"} />
            <input
                className={styles.inp}
                type="password"
                placeholder={props.placeholder || "Пароль"}
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
}

interface AuthUsernameInputProps extends InputProps {}
export function AuthUsernameInput(props: AuthUsernameInputProps) {
    return (
        <div className={styles.divinp}>
            <UserIcon className="ml-1 mt-2" size={28} color={"black"} />
            <input
                className={styles.inp}
                type="text"
                placeholder="Имя пользователя"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
}

interface AuthEmailInputProps extends InputProps {}
export function AuthEmailInput(props: AuthEmailInputProps) {
    return (
        <div className={styles.divinp}>
            <EmailIcon className="ml-1 mt-2 my-auto" size={26} color={"black"} />
            <input
                className={styles.inp}
                type="email"
                placeholder="Электронная почта"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
}

interface FormHeaderProps {
    children?: React.ReactElement;
}
export function FormHeader(props: FormHeaderProps) {
    return <p className="text-center fw-bold fs-3 mb-4">{props.children}</p>;
}

interface FormFooterProps {
    children: React.ReactElement;
}
export function FormFooter(props: FormFooterProps) {
    return <p className="text-center my-1 mt-3">{props.children}</p>;
}

interface FormBtnProps {
    text: string;
}
export function FormBtn(props: FormBtnProps) {
    return <button className={styles.commonBtn}>{props.text}</button>;
}

interface AuthFormProps {
    children: React.ReactElement;
    onSubmit: React.FormEventHandler;
    autocomplete?: string;
}
export function AuthForm(props: AuthFormProps) {
    return (
        <form
            action="#"
            className={[
                styles.authForm,
                "col-md-5 col-lg-4 col-xl-4 col-xxl-3 p-1 p-sm-2 p-md-3 p-xl-4 mx-auto mt-0 mt-md-2",
            ].join(" ")}
            onSubmit={props.onSubmit}
            autoComplete={props.autocomplete || "on"}
        >
            {props.children}
        </form>
    );
}
