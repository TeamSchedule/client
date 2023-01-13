import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../AuthFormLayout";
import BaseButton from "../../buttons/BaseButton";
import React, { FormEvent, useState } from "react";
import { ResetPasswordCodeRequestSchema } from "../../../schemas/requests/auth";
import { API } from "../../../api/api";

export default function ResetPasswordCodeForm() {
    /*
     * Форма отправки одноразового кода для сброса пароля.
     * */
    const navigate = useNavigate();

    const [resetCode, setRestCode] = useState("");

    const [isActionInProgress, setIsActionInProgress] = useState(false);

    function onInputResetCode(event: FormEvent) {
        event.preventDefault();
        setIsActionInProgress(true);
        const resetCodeData: ResetPasswordCodeRequestSchema = {
            code: resetCode,
        };

        API.auth
            .sendResetPswCode(resetCodeData)
            .then(() => {})
            .catch(() => {})
            .finally(() => {
                setIsActionInProgress(false);
            });
    }

    return (
        <>
            <div>
                <AuthFormLayout onSubmit={onInputResetCode}>
                    <>
                        <BaseButton
                            text="Отправить"
                            color="success"
                            disabled={true}
                            loading={isActionInProgress}
                            className="mt-3"
                        />
                    </>
                </AuthFormLayout>
            </div>
        </>
    );
}
