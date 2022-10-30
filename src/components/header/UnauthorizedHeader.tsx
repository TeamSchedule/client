import React from "react";
import { Link } from "react-router-dom";

export default function UnauthorizedHeader() {
    return (
        <header className="row justify-content-end main-header m-0 py-2 px-2">
            <div className="d-flex justify-content-end align-items-center">
                <UnauthorizedHeaderLink linkTo="signup" text="Зарегистрироваться" />
                <UnauthorizedHeaderLink linkTo="login" text="Войти" />
            </div>
        </header>
    );
}

interface UnauthorizedHeaderLinkProps {
    text: string;
    linkTo: string;
}

function UnauthorizedHeaderLink({ text, linkTo }: UnauthorizedHeaderLinkProps) {
    return (
        <>
            <Link to={linkTo} className="mx-2 fs-5">
                {text}
            </Link>
        </>
    );
}
