import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../AuthFormLayout";
import BaseButton from "../../buttons/BaseButton";
import React, { FormEvent, useState } from "react";
import { CreateNewPasswordRequestSchema } from "../../../schemas/requests/auth";
import { API } from "../../../api/api";

export default function NewPasswordForm() {
    /*
     * Форма для создания пароля после сброса.
     * */
    const navigate = useNavigate();

    const [isActionInProgress, setIsActionInProgress] = useState(false);

    function onInputNewPassword(event: FormEvent) {
        event.preventDefault();
        setIsActionInProgress(true);
        const newPasswordData: CreateNewPasswordRequestSchema = {
            password: "",
        };

        API.auth
            .createNewPassword(newPasswordData)
            .then(() => {})
            .catch(() => {})
            .finally(() => {
                setIsActionInProgress(false);
            });
    }

    return (
        <>
            <AuthFormLayout onSubmit={onInputNewPassword}>
                <>
                    <BaseButton
                        text="Сохрнаить пароль"
                        color="success"
                        disabled={true}
                        loading={isActionInProgress}
                        className="mt-3"
                    />
                </>
            </AuthFormLayout>
        </>
    );
}
