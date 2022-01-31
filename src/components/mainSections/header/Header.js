import React from 'react';
import {useNavigate} from "react-router";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {deleteAccessToken} from "../../../api-server/axiosRequests";
import {onLogout, selectIsAuth} from "../../../features/isAuthSlice";
import {onDeleteUserInfo, selectUserInfo} from "../../../features/userInfoSlice";

import "./header.css";
import userIcon from "./userIcon.png";


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
    const dispatch = useDispatch();

    function logout() {
        // TODO: API.auth.signOut().then(() => {
        dispatch(onDeleteUserInfo());
        dispatch(onLogout());
        deleteAccessToken();
        window.localStorage.clear();
        navigate("/");
        // });
    }

    const userInfo = useSelector(selectUserInfo);

    return (
        <header className="row justify-content-end py-2 main-header mx-0 px-2 position-fixed left-0 top-0 right-0">
            <div className="d-flex justify-content-end">
                <Link className="mx-3 no-underline username"
                      to={`/${userInfo.username}/profile`}>{userInfo.username}</Link>
                <div className="btn-group dropleft">
                    <img src={userIcon}
                         alt="user-icon"
                         className="dropdown-toggle cursor-pointer userIconImg"
                         data-toggle="dropdown"
                         data-bs-display="static"
                         aria-haspopup="true" aria-expanded="false" />
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={`/${userInfo.username}/profile`}>Profile</Link>
                        <Link className="dropdown-item" to={`/${userInfo.username}/teams`}>Teams</Link>
                        <Link className="dropdown-item" to={`/${userInfo.username}/tasks`}>Tasks</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/" onClick={logout}>Sign out</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}


export default function Header() {
    const isAuth = useSelector(selectIsAuth);

    return (isAuth ? <AuthorizedHeader /> : <UnauthorizedHeader />);
}
