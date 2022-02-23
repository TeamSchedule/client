import React from "react";
import Button from "@mui/material/Button";


export function AuthPasswordInput(props) {
    return (
        <div className="d-flex flex-column my-1">
            <label className={props.labelClassName} htmlFor={props.labelHtmlFor}>
                {props.labelText || "Password"}
            </label>
            <input className="py-1 my-1" type="password"
                   value={props.value}
                   onChange={e => props.setValue(e.target.value)} />
        </div>
    );
}


export function AuthUsernameInput(props) {
    return (
        <div className="d-flex flex-column my-1">
            <label className={props.labelClassName} htmlFor={props.labelHtmlFor}>
                Username
            </label>
            <input className="py-1 my-1" type="text"
                   value={props.value}
                   onChange={e => props.setValue(e.target.value)} />
        </div>
    );
}


export function AuthEmailInput(props) {
    return (
        <div className="d-flex flex-column my-1">
            <label className={props.labelClassName} htmlFor={props.labelHtmlFor}>
                Email
            </label>
            <input className="py-1 my-1" type="email"
                   value={props.value}
                   onChange={e => props.setValue(e.target.value)} />
        </div>
    );
}


export function FormHeader(props) {
    return (
        <p className="text-center fw-bold fs-5">
            {props.headerText}
        </p>
    );
}


export function FormFooter(props) {
    return (
        <div className="d-flex justify-content-between mt-2">
            <span></span>
            {props.toggleAuthFormLink}
        </div>
    );
}


export function AuthForm(props) {
    return (
        <form action="#" className="col-md-12 col-lg-8 col-xl-6 col-xxl-4 p-3 authForm" onSubmit={props.onSubmit}>
            {props.innerForm}
        </form>
    );
}

// MUI Components

export function AuthSubmitButton(props) {
    return (
        <Button variant="contained" color="success" className="my-2" type="submit">
            {props.btnText}
        </Button>
    );
}
