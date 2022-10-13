import { Link } from "react-router-dom";
import React from "react";

function UnauthorizedHeader() {
    return (
        <header className="row justify-content-end main-header m-0 py-2 px-2">
            <div className="d-flex justify-content-end">
                <Link to="signup" className="headerLink">
                    Зарегистрироваться
                </Link>
                <Link to="login" className="headerLink">
                    Войти
                </Link>
            </div>
        </header>
    );
}

export default UnauthorizedHeader;
