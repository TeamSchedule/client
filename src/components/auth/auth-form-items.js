import React from "react";

export function AuthPasswordInput(props) {
    return (
        <div className="d-flex flex-column my-1">
            <label className={props.labelClassName} htmlFor={props.labelHtmlFor}>
                {props.labelText || "Пароль"}
            </label>
            <input
                className="py-1 my-1"
                type="password"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
}

export function AuthUsernameInput(props) {
    return (
        <div className="d-flex flex-column my-1">
            <label className={props.labelClassName} htmlFor={props.labelHtmlFor}>
                Имя пользователя
            </label>
            <input
                className="py-1 my-1"
                type="text"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
}

export function AuthEmailInput(props) {
    return (
        <div className="d-flex flex-column my-1">
            <label className={props.labelClassName} htmlFor={props.labelHtmlFor}>
                Электронная почта
            </label>
            <input
                className="py-1 my-1"
                type="email"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
}

export function FormHeader({ headerText }) {
    return <p className="text-center fw-bold fs-5">{headerText}</p>;
}

export function FormFooter({ toggleAuthFormLink }) {
    return (
        <div className="d-flex justify-content-between mt-2">
            <span></span>
            {toggleAuthFormLink}
        </div>
    );
}

export function AuthForm({ innerForm, onSubmit }) {
    return (
        <form
            action="#"
            className="col-md-12 col-lg-8 col-xl-6 col-xxl-4 p-1 p-sm-2 p-md-3 p-xl-4 mx-auto mt-0 mt-md-2 mt-xl-5 authForm"
            onSubmit={onSubmit}
        >
            {innerForm}
        </form>
    );
}
