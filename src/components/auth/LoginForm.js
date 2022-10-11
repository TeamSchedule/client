import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { API } from "../../api/api";
import { setAccessToken } from "../../api/axiosRequests";
import { login } from "../../features/isAuthSlice";
import { set } from "../../features/userInfoSlice";
import {
    AuthForm,
    AuthPasswordInput,
    AuthUsernameInput,
    FormFooter,
    FormHeader,
} from "./auth-form-items";
import "./auth.css";
import SuccessFormButton from "../buttons/SuccessFormButton";
import { ServiceUnavailableErrorMsg, WrongCredentialsErrorMsg } from "./ErrMsgs";

export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isWrongCredentials, setIsWrongCredentials] = useState(false);
    const [isServiceUnavailableErrShown, setIsServiceUnavailableErrShown] = useState(false);

    function signin(e) {
        e.preventDefault();

        API.auth
            .signIn({
                login: username,
                password: password,
            })
            .then((data) => {
                setPassword("");
                const token = data.access;
                setAccessToken(token);
                localStorage.setItem("access", token);
                localStorage.setItem("refresh", data.refresh);
                dispatch(login());
                API.users.get().then((res) => {
                    dispatch(set(res.data.user));
                    navigate(`/${res.data.user.login}/profile`);
                });
            })
            .catch((err) => {
                setPassword("");
                const statusCode = err.response.status;
                if (statusCode >= 500) {
                    setIsWrongCredentials(false);
                    setIsServiceUnavailableErrShown(true);
                } else if (statusCode >= 400) {
                    setIsWrongCredentials(true);
                    setIsServiceUnavailableErrShown(false);
                }
            });
    }

    return (
        <AuthForm
            onSubmit={signin}
            innerForm={
                <>
                    <FormHeader
                        headerText={
                            <>
                                Войти в &nbsp;<Link to="/">Командное расписание</Link>&nbsp;!
                            </>
                        }
                    />

                    <AuthUsernameInput value={username} setValue={setUsername} />
                    <AuthPasswordInput value={password} setValue={setPassword} />

                    <WrongCredentialsErrorMsg visible={isWrongCredentials} />
                    <ServiceUnavailableErrorMsg visible={isServiceUnavailableErrShown} />

                    <SuccessFormButton btnText="ВОЙТИ" />
                    <FormFooter
                        toggleAuthFormLink={
                            <Link to="/signup">Ещё не создали аккаунт? Создать</Link>
                        }
                    />
                </>
            }
        />
    );
}
