import { useLocation, useNavigate } from "react-router-dom";
import AuthFormLayout from "../AuthFormLayout";
import BaseButton from "../../buttons/BaseButton";
import React, { FormEvent, useEffect, useState } from "react";
import { ResetPasswordCodeRequestSchema } from "../../../api/schemas/requests/auth";
import { API } from "../../../api/api";
import { TextField } from "@mui/material";
import { newPasswordPath } from "../../../routes/paths";

const TrueResetCodeLength = 6;
const onlyDigitRegex = /^[0-9\b]+$/;

export default function ResetPasswordCodeForm() {
    /*
     * Форма отправки одноразового кода для сброса пароля.
     * */
    const navigate = useNavigate();

    const { state } = useLocation();
    const { email } = state;

    const [resetCode, setRestCode] = useState("");
    const [isResetCodeValid, setIsResetCodeValid] = useState<boolean | null>(null);

    const [isActionInProgress, setIsActionInProgress] = useState(false);

    useEffect(() => {
        if (resetCode.length === 0) {
            setIsResetCodeValid(null);
        } else if (resetCode.length === TrueResetCodeLength) {
            setIsResetCodeValid(true);
        } else {
            setIsResetCodeValid(false);
        }
    }, [resetCode]);

    function handleChangeResetCode(e: React.ChangeEvent<any>) {
        if (e.target.value === "" || onlyDigitRegex.test(e.target.value)) {
            setRestCode(e.target.value);
        }
    }

    function onInputResetCode(event: FormEvent) {
        event.preventDefault();
        setIsActionInProgress(true);
        const resetCodeData: ResetPasswordCodeRequestSchema = {
            code: resetCode,
        };

        API.auth
            .sendResetPswCode(resetCodeData)
            .then(() => {
                navigate(newPasswordPath);
            })
            .catch(() => {})
            .finally(() => {
                navigate(newPasswordPath);
                setIsActionInProgress(false);
            });
    }

    return (
        <>
            <div>
                <AuthFormLayout onSubmit={onInputResetCode}>
                    <>
                        <p>
                            На Вашу почту <span style={{ fontFamily: "monospace", fontWeight: "bold" }}>{email}</span>{" "}
                            был выслан одноразовый код для восстановления доступа. Введите его для сброса пароля.
                        </p>

                        <TextField
                            fullWidth
                            label="КОД"
                            inputProps={{
                                style: { textAlign: "center", fontFamily: "monospace" },
                            }}
                            error={!(isResetCodeValid === null || isResetCodeValid)}
                            variant="outlined"
                            value={resetCode}
                            onChange={handleChangeResetCode}
                        />
                        <BaseButton
                            text="Отправить"
                            color="success"
                            disabled={!isResetCodeValid}
                            loading={isActionInProgress}
                            className="mt-3"
                        />
                    </>
                </AuthFormLayout>
            </div>
        </>
    );
}
