import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { API } from "../../api/api";
import { setAccessToken } from "../../api/axiosRequests";
import { set } from "../../features/userInfoSlice";
import AuthFormLayout from "./AuthFormLayout";
import ErrorMsg from "../ErrorMsg";
import { TokenPair } from "../../api/schemas/responses/auth";
import { SignInRequestSchema } from "../../api/schemas/requests/auth";
import { GetMeResponseSchema, UserSchema } from "../../api/schemas/responses/users";
import { PasswordInput, UsernameInput } from "../inputs";
import BaseButton from "../buttons/BaseButton";
import { ERRORS } from "../../consts";
import styles from "./Auth.module.scss";
import { forgotPasswordPath } from "../../routes/paths";
import { LocalStorageApi } from "../../api/storage";
import { AuthUserKey } from "../../consts/common";

export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isActionInProgress, setIsActionInProgress] = useState(false);
    const [isWrongCredentials, setIsWrongCredentials] = useState(false);
    const [isServiceUnavailableErrShown, setIsServiceUnavailableErrShown] = useState(false);

    function signInHandler(event: FormEvent) {
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
                API.users.getUser().then((user: UserSchema) => {
                    dispatch(set(user));
                    navigate(`/${user.login}/profile`);
                });
            })
            .catch((err) => {
                setPassword("");
                const statusCode = err.response ? err.response.status : 500;
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
        <AuthFormLayout onSubmit={signInHandler}>
            <>
                <p className={styles.formHeader}>Вход</p>
                <UsernameInput value={username} setValue={setUsername} className={styles.formInputWrapper} />
                <PasswordInput value={password} setValue={setPassword} className={styles.formInputWrapper} />
                <div className={["w-100", styles.forgotPasswordText].join(" ")}>
                    <Link to={forgotPasswordPath}>Забыли пароль?</Link>
                </div>

                <ErrorMsg errText={ERRORS.SignIn.WrongCredentials} visible={isWrongCredentials} />
                <ErrorMsg errText={ERRORS.Service.ServiceUnavailable} visible={isServiceUnavailableErrShown} />

                <BaseButton text="Войти" className="mt-3" loading={isActionInProgress} />
                <p className={styles.formFooter}>
                    Ещё не создали аккаунт?
                    <br></br>
                    <Link to="/signup">Зарегистрироваться!</Link>
                </p>
            </>
        </AuthFormLayout>
    );
}
