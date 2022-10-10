import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {deleteAccessToken} from "../../api/axiosRequests";
import {onLogout, selectIsAuth} from "../../features/isAuthSlice";
import {onDeleteUserInfo, selectUserInfo} from "../../features/userInfoSlice";

import "./header.css";
import userIcon from "../../assets/userIcon.png";
import getUserAvatarImageSrc from "../../utils/getUserAvatarImageSrc";


function UnauthorizedHeader() {
    return (
        <header className="row justify-content-end main-header m-0 py-2 px-2">
            <div className="d-flex justify-content-end">
                <Link to="signup" className="headerLink">Зарегистрироваться</Link>
                <Link to="login" className="headerLink">Войти</Link>
            </div>
        </header>
    );
}


function AuthorizedHeader() {
    const [avatarSrc, setAvatarSrc] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);

    function logout() {
        dispatch(onDeleteUserInfo());
        dispatch(onLogout());
        deleteAccessToken();
        window.localStorage.clear();
        navigate("/");
    }

    useEffect(() => {
        getUserAvatarImageSrc().then(setAvatarSrc);
    }, [userInfo.id]);

    return (
        <header className="row justify-content-end py-2 main-header mx-0 px-2 position-fixed left-0 top-0 right-0">
            <div className="d-flex justify-content-end">
                <Link className="mx-3 no-underline username"
                      to={`/${userInfo.login}/profile`}>{userInfo.login}</Link>
                <div className="btn-group dropleft">
                    <img src={avatarSrc.length >= 0 ? avatarSrc : userIcon}
                         alt="user-icon"
                         className="dropdown-toggle cursor-pointer userIconImg"
                         data-toggle="dropdown"
                         data-bs-display="static"
                    />
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={`/${userInfo.login}/profile`}>Профиль</Link>
                        <Link className="dropdown-item" to={`/${userInfo.login}/teams`}>Команды</Link>
                        <Link className="dropdown-item" to={`/${userInfo.login}/tasks`}>Задачи</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/" onClick={logout}>Выйти</Link>
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
