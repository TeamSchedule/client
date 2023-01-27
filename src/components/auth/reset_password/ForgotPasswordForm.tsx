import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../AuthFormLayout";
import React, { FormEvent, useState } from "react";
import { EmailInput } from "../../inputs";
import styles from "../Auth.module.scss";
import BaseButton from "../../buttons/BaseButton";
import validateEmail from "../../../utils/validateEmail";
import { API } from "../../../api/api";
import { ResetPasswordEmailRequestSchema } from "../../../api/schemas/requests/auth";
import { resetPasswordCodePath } from "../../../routes/paths";

export default function ForgotPasswordForm() {
    /*
     * Форма отправки email для сброса пароля.
     * */
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [isEmailValid, setIsEmailValid] = useState<boolean | undefined>();

    const [isActionInProgress, setIsActionInProgress] = useState(false);

    function onInputResetEmail(event: FormEvent) {
        event.preventDefault();

        setIsActionInProgress(true);

        const resetData: ResetPasswordEmailRequestSchema = {
            email: email,
        };

        API.auth
            .sendResetPswEmail(resetData)
            .then(() => {})
            .catch(() => {})
            .finally(() => {
                navigate(resetPasswordCodePath, { state: { email: email } });
                setIsActionInProgress(false);
            });
    }

    function onChangeEmail(email: string) {
        setEmail(email);
        setIsEmailValid(validateEmail(email));
    }

    return (
        <>
            <AuthFormLayout onSubmit={onInputResetEmail}>
                <>
                    <p>Введите Ваш email для восстановления досутпа</p>
                    <EmailInput
                        value={email}
                        setValue={onChangeEmail}
                        isOk={isEmailValid}
                        className={styles.formInputWrapper}
                    />

                    <BaseButton
                        text="Получить код"
                        color="success"
                        disabled={!isEmailValid}
                        loading={isActionInProgress}
                        className="mt-3"
                    />
                </>
            </AuthFormLayout>
        </>
    );
}
