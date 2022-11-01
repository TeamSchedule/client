import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../api/api";
import AuthFormLayout from "./AuthFormLayout";
import ErrorMsg from "../ErrorMsg";
import { SignUpRequestSchema } from "../../api/schemas/requests/auth";
import { EmailInput, PasswordInput, UsernameInput } from "../inputs";
import BaseButton from "../buttons/BaseButton";
import validateEmail from "../../utils/validateEmail";
import styles from "./Auth.module.scss";
import ERRORS from "../../consts/errors";

export default function RegisterForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState<boolean | undefined>();

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean | undefined>();

    const [isFormDisabled, setIsFormDisabled] = useState(true);

    const [isActionInProgress, setIsActionInProgress] = useState(false);
    const [isRegErrShown, setIsRegErrShown] = useState(false);
    const [isNameOccupiedErrShown, setIsNameOccupiedErrShown] = useState(false);

    useEffect(() => {
        setIsPasswordsMatch(password !== password2);
    }, [password2]);

    useEffect(() => {
        setIsFormDisabled(isPasswordsMatch || username.length === 0 || !isEmailValid);
    }, [isPasswordsMatch, isEmailValid, username]);

    function onChangeEmail(email: string) {
        setEmail(email);
        setIsEmailValid(validateEmail(email));
    }

    function signUpHandler(event: React.FormEvent) {
        event.preventDefault();
        setIsActionInProgress(true);

        if (password !== password2) return;

        const signUpRequestData: SignUpRequestSchema = {
            email: email,
            login: username,
            password: password,
        };

        API.auth
            .signUp(signUpRequestData)
            .then(() => {
                setPassword("");
                navigate("/login");
            })
            .catch((err) => {
                const statusCode = err.response.status;
                if (statusCode >= 500) {
                    setIsNameOccupiedErrShown(false);
                    setIsRegErrShown(true);
                } else if (statusCode >= 400) {
                    setIsNameOccupiedErrShown(true);
                    setIsRegErrShown(false);
                }
            })
            .finally(() => {
                setIsActionInProgress(false);
            });
    }

    return (
        <AuthFormLayout onSubmit={signUpHandler}>
            <>
                <p className={styles.formHeader}>
                    Зарегистрироваться в&nbsp;
                    <Link to="/">Командном расписании</Link>&nbsp;!
                </p>

                <EmailInput
                    value={email}
                    setValue={onChangeEmail}
                    isOk={isEmailValid}
                    className={styles.formInputWrapper}
                />
                <UsernameInput value={username} setValue={setUsername} className={styles.formInputWrapper} />
                <ErrorMsg errText={ERRORS.SignUp.NameAlreadyExist} visible={isNameOccupiedErrShown} />

                <PasswordInput
                    value={password}
                    setValue={setPassword}
                    isOk={!isPasswordsMatch}
                    className={styles.formInputWrapper}
                />
                <PasswordInput
                    value={password2}
                    setValue={setPassword2}
                    placeholder="Повторите пароль"
                    isOk={!isPasswordsMatch}
                    className={styles.formInputWrapper}
                />
                <ErrorMsg errText={ERRORS.SignUp.PasswordsDontMatch} visible={isPasswordsMatch} />
                <ErrorMsg errText={ERRORS.Service.ServiceUnavailable} visible={isRegErrShown} />

                <BaseButton
                    text="Зарегистрироваться"
                    onClick={signUpHandler}
                    disabled={isFormDisabled}
                    loading={isActionInProgress}
                    className="mt-3"
                />

                <p className={styles.formFooter}>
                    Уже зарегистрировались?
                    <br></br>
                    <Link to="/login">Войти!</Link>
                </p>
            </>
        </AuthFormLayout>
    );
}
