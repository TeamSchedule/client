import React from 'react';
import {useNavigate} from "react-router";
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";

import {deleteAccessToken} from "../../../api/axiosRequests";
import {selectUserInfo} from "../../../features/userInfoSlice";

import "./header.css";
import userIcon from "./userIcon.png";
import isAuthenticated from "../../../utils/isAuthenticated";


function UnauthorizedHeader() {
    return (
        <header className="row justify-content-end main-header m-0 py-2 px-2">
            <div className="d-flex justify-content-end">
                <Link to="signup" className="headerLink">Sign up</Link>
                <Link to="login" className="headerLink">Log in</Link>
            </div>
        </header>
    );
}


function AuthorizedHeader() {
    const navigate = useNavigate();

    function logout() {
        deleteAccessToken();
        window.localStorage.clear();
        navigate("/");
    }

    const userInfo = useSelector(selectUserInfo);

    return (
        <header className="row justify-content-end py-2 main-header mx-0 px-2 position-fixed left-0 top-0 right-0">
            <div className="d-flex justify-content-end">
                <Link className="mx-3 no-underline username"
                      to={`/${userInfo.login}/profile`}>{userInfo.login}</Link>
                <div className="btn-group dropleft">
                    <img src={userIcon}
                         alt="user-icon"
                         className="dropdown-toggle cursor-pointer userIconImg"
                         data-toggle="dropdown"
                         data-bs-display="static"
                        // aria-haspopup="true"
                        // aria-expanded="false"
                    />
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={`/${userInfo.login}/profile`}>Profile</Link>
                        <Link className="dropdown-item" to={`/${userInfo.login}/teams`}>Teams</Link>
                        <Link className="dropdown-item" to={`/${userInfo.login}/tasks`}>Tasks</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/" onClick={logout}>Sign out</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}


export default function Header() {
    return (isAuthenticated() ? <AuthorizedHeader /> : <UnauthorizedHeader />);
}
