import React from "react";
import { Link } from "react-router-dom";

function UnauthorizedHeader() {
    return (
        <header className="row justify-content-end main-header m-0 py-2 px-2">
            <div className="d-flex justify-content-end align-items-center">
                <UnauthorizedHeaderLink linkTo="signup" text="Зарегистрироваться" />
                <UnauthorizedHeaderLink linkTo="login" text="Войти" />
            </div>
        </header>
    );
}

export default UnauthorizedHeader;

function UnauthorizedHeaderLink({ text, linkTo }) {
    return (
        <>
            <Link to={linkTo} className="mx-2 fs-5">
                {text}
            </Link>
        </>
    );
}
