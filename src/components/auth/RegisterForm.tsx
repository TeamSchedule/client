import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../api/api";
import AuthFormLayout from "./AuthFormLayout";
import ErrorMsg from "../ErrorMsg";
import { SignUpRequestSchema } from "../../schemas/requests/auth";
import { EmailInput, PasswordInput, UsernameInput } from "../inputs";
import BaseButton from "../buttons/BaseButton";
import validateEmail from "../../utils/validateEmail";
import styles from "./Auth.module.scss";
import { ERRORS, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "../../consts";

export default function RegisterForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string | undefined>();
    const [isNameTooShort, setIsNameTooShort] = useState<boolean | undefined>();
    const [isNameOccupied, setIsNameOccupied] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState<boolean | undefined>();

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState<boolean | undefined>();

    const [password, setPassword] = useState<string | undefined>();
    const [password2, setPassword2] = useState<string | undefined>();
    const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean | undefined>();
    const [isPasswordHasGoodLen, setIsPasswordHasGoodLen] = useState<boolean | undefined>();
    const [isPasswordsOK, setIsPasswordsOK] = useState<boolean | undefined>();

    const [isFormDisabled, setIsFormDisabled] = useState(true);

    const [isActionInProgress, setIsActionInProgress] = useState(false);
    const [isRegErrShown, setIsRegErrShown] = useState(false);

    useEffect(() => {
        if (username === undefined) return;
        if (username.length < MIN_USERNAME_LENGTH) {
            setIsNameTooShort(true);
            return;
        }
        setIsNameTooShort(false);
        setIsNameOccupied(false);
    }, [username]);

    useEffect(() => {
        if (isNameTooShort === undefined || isNameOccupied === undefined) return;
        setIsUsernameValid(!isNameTooShort && !isNameOccupied);
    }, [isNameTooShort, isNameOccupied]);

    useEffect(() => {
        // Если пароли еще не изменялись
        if (password === undefined && password2 === undefined) return;

        // Если пароль короткий
        if (password && password.length < MIN_PASSWORD_LENGTH) {
            setIsPasswordHasGoodLen(false);
            return;
        }
        setIsPasswordHasGoodLen(true);

        // пользователь еще не начал вводить второй пароль
        if (password2 === undefined) return;

        // Если пароли не совпадают
        if (password !== password2) {
            setIsPasswordsMatch(false);
            return;
        }
        setIsPasswordsMatch(true);
    }, [password, password2]);

    useEffect(() => {
        if (isPasswordHasGoodLen === undefined || isPasswordsMatch === undefined) {
            setIsPasswordsOK(undefined);
        }
        setIsPasswordsOK(isPasswordHasGoodLen && isPasswordsMatch);
    }, [isPasswordsMatch, isPasswordHasGoodLen]);

    useEffect(() => {
        setIsFormDisabled(!isPasswordsOK || !isUsernameValid || !isEmailValid);
    }, [isEmailValid, isUsernameValid, isPasswordsOK]);

    function onChangeEmail(email: string) {
        setEmail(email);
        setIsEmailValid(validateEmail(email));
    }

    function signUpHandler(event: React.FormEvent) {
        event.preventDefault();
        if (isFormDisabled) return;
        if (!username || !password) return;

        setIsActionInProgress(true);

        const signUpRequestData: SignUpRequestSchema = {
            email: email,
            login: username,
            password: password,
        };

        API.auth
            .signUp(signUpRequestData)
            .then(() => {
                setPassword("");
                navigate("/ready");
            })
            .catch((err) => {
                const statusCode = err.response.status;
                if (statusCode >= 500) {
                    setIsNameOccupied(false);
                    setIsRegErrShown(true);
                } else if (statusCode >= 400) {
                    setIsNameOccupied(true);
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
                <p className={styles.formHeader}>Регистрация</p>

                <UsernameInput
                    value={username}
                    setValue={setUsername}
                    className={styles.formInputWrapper}
                    isOk={isUsernameValid}
                />
                <ErrorMsg errText={ERRORS.SignUp.TooShortName} visible={isNameTooShort} />
                <ErrorMsg errText={ERRORS.SignUp.NameAlreadyExist} visible={isNameOccupied} />

                <EmailInput
                    value={email}
                    setValue={onChangeEmail}
                    isOk={isEmailValid}
                    className={styles.formInputWrapper}
                />

                <PasswordInput
                    value={password}
                    setValue={setPassword}
                    isOk={isPasswordHasGoodLen || isPasswordsOK}
                    className={styles.formInputWrapper}
                />
                <PasswordInput
                    value={password2}
                    setValue={setPassword2}
                    placeholder="Повторите пароль"
                    isOk={isPasswordsOK}
                    className={styles.formInputWrapper}
                />
                <ErrorMsg
                    errText={ERRORS.SignUp.PasswordsDontMatch}
                    visible={isPasswordsMatch !== undefined && !isPasswordsMatch}
                />
                <ErrorMsg
                    errText={ERRORS.SignUp.PasswordsTooShort}
                    visible={isPasswordHasGoodLen !== undefined && !isPasswordHasGoodLen}
                />
                <ErrorMsg errText={ERRORS.Service.ServiceUnavailable} visible={isRegErrShown} />

                <BaseButton
                    text="Зарегистрироваться"
                    onClick={signUpHandler}
                    color="success"
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
