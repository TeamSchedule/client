import React from "react";
import { UserIcon, PasswordIcon, EmailIcon } from "../svg";

export function AuthPasswordInput(props) {
    return (
        <div className="d-flex mt-1 mb-3 divinp">
            <PasswordIcon className="ml-1 mt-2 my-auto" size={28} color={"black"} />
            <input
                className="py-1 my-1 inp"
                type="password"
                placeholder="Пароль"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
}

export function AuthUsernameInput(props) {
    return (
        <div className="d-flex mt-1 mb-3 divinp">
            <UserIcon className="ml-1 mt-2" size={28} color={"black"} />
            <input
                className="py-1 my-1 inp"
                type="text"
                placeholder="Имя пользователя"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
}

export function AuthEmailInput(props) {
    return (
        <div className="d-flex mt-1 mb-3 divinp">
            <EmailIcon className="ml-1 mt-2 my-auto" size={26} color={"black"} />
            <input
                className="py-1 my-1 inp"
                type="email"
                placeholder="Электронная почта"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
}

export function FormHeader({ headerText }) {
    return <p className="text-center fw-bold fs-3 mb-4">{headerText}</p>;
}

export function FormText({ text }) {
    return <p className="text-right mr-5 mb-4">{text}</p>;
}

export function FormFooter({ toggleAuthFormLink }) {
    return (
        <div className="d-flex justify-content-center mt-3">
            <p className="text-center my-1">{toggleAuthFormLink}</p>
        </div>
    );
}

export function FormBtn({ text }) {
    return (
        <div className="d-flex justify-content-center btn">
            <button className="btnn">{text}</button>
        </div>
    );
}

export function AuthForm({ innerForm, onSubmit }) {
    return (
        <form
            action="#"
            className="col-md-5 col-lg-4 col-xl-4 col-xxl-3 p-1 p-sm-2 p-md-3 p-xl-4 mx-auto mt-0 mt-md-2 mt-xl-5 authForm"
            onSubmit={onSubmit}
        >
            {innerForm}
        </form>
    );
}
