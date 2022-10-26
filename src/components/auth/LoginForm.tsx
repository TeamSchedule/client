import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
import SuccessFormButton from "../buttons/SuccessFormButton";
import { ServiceUnavailableErrorMsg, WrongCredentialsErrorMsg } from "./ErrMsgs";
import { TokenPair } from "../../api/schemas/responses/auth";
import { SignInRequestSchema } from "../../api/schemas/requests/auth";
import "./auth.css";

export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isActionInProgress, setIsActionInProgress] = useState(false);
    const [isWrongCredentials, setIsWrongCredentials] = useState(false);
    const [isServiceUnavailableErrShown, setIsServiceUnavailableErrShown] = useState(false);

    function signInHandler(event: React.FormEvent) {
        event.preventDefault();
        setIsActionInProgress(true);

        const signInRequestData: SignInRequestSchema = {
            login: username,
            password: password,
        };
        API.auth
            .signIn(signInRequestData)
            .then((tokens: TokenPair) => {
                setPassword("");
                setAccessToken(tokens.access);
                localStorage.setItem("access", tokens.access);
                localStorage.setItem("refresh", tokens.refresh);
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
            })
            .finally(() => {
                setIsActionInProgress(false);
            });
    }

    return (
        <AuthForm
            onSubmit={signInHandler}
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

                    <SuccessFormButton btnText="ВОЙТИ" loading={isActionInProgress} />
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