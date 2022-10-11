import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userInfoSlice";
import { Link } from "react-router-dom";
import PersonalAvatar from "../avatars/PersonalAvatar";
import clearInfo from "../../utils/clearInfo";

function AuthorizedHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);

    function logout() {
        clearInfo(dispatch);
        navigate("/");
    }

    return (
        <header className="row justify-content-end py-2 main-header mx-0 px-2 position-fixed left-0 top-0 right-0">
            <div className="d-flex justify-content-end">
                <Link className="mx-3 no-underline username" to={`/${userInfo.login}/profile`}>
                    {userInfo.login}
                </Link>
                <div className="btn-group dropleft">
                    <div className="cursor-pointer" data-toggle="dropdown" data-bs-display="static">
                        <PersonalAvatar width={25} height={25} />
                    </div>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={`/${userInfo.login}/profile`}>
                            Профиль
                        </Link>
                        <Link className="dropdown-item" to={`/${userInfo.login}/teams`}>
                            Команды
                        </Link>
                        <Link className="dropdown-item" to={`/${userInfo.login}/tasks`}>
                            Задачи
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/" onClick={logout}>
                            Выйти
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AuthorizedHeader;
