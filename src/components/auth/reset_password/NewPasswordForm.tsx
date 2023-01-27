import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../AuthFormLayout";
import BaseButton from "../../buttons/BaseButton";
import React, { FormEvent, useEffect, useState } from "react";
import { CreateNewPasswordRequestSchema } from "../../../api/schemas/requests/auth";
import { API } from "../../../api/api";
import { ERRORS, MIN_PASSWORD_LENGTH } from "../../../consts";
import { PasswordInput } from "../../inputs";
import styles from "../Auth.module.scss";
import ErrorMsg from "../../ErrorMsg";

export default function NewPasswordForm() {
    /*
     * Форма для создания пароля после сброса.
     * */
    const navigate = useNavigate();

    const [password, setPassword] = useState<string | undefined>();
    const [password2, setPassword2] = useState<string | undefined>();
    const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean | undefined>();
    const [isPasswordHasGoodLen, setIsPasswordHasGoodLen] = useState<boolean | undefined>();
    const [isPasswordsOK, setIsPasswordsOK] = useState<boolean | undefined>();

    const [isActionInProgress, setIsActionInProgress] = useState(false);
    const [isNewPasswordErrShown, setIsNewPasswordErrShown] = useState(false);

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

    function onInputNewPassword(event: FormEvent) {
        event.preventDefault();
        setIsActionInProgress(true);
        const newPasswordData: CreateNewPasswordRequestSchema = {
            password: "",
        };

        API.auth
            .createNewPassword(newPasswordData)
            .then(() => {
                setIsNewPasswordErrShown(false);
                navigate("");
            })
            .catch(() => {
                setIsNewPasswordErrShown(true);
            })
            .finally(() => {
                setIsActionInProgress(false);
            });
    }

    return (
        <>
            <AuthFormLayout onSubmit={onInputNewPassword}>
                <>
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
                    <ErrorMsg errText={ERRORS.Service.ServiceUnavailable} visible={isNewPasswordErrShown} />

                    <BaseButton
                        text="Сохранить пароль"
                        color="success"
                        disabled={!isPasswordsOK}
                        loading={isActionInProgress}
                        className="mt-3"
                    />
                </>
            </AuthFormLayout>
        </>
    );
}
