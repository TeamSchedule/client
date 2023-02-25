import { useLocation, useNavigate } from "react-router-dom";
import React, { FormEvent, useEffect, useState } from "react";
import { ResetPasswordCodeRequestSchema } from "../../../api/schemas/requests/auth";
import { API } from "../../../api/api";
import { newPasswordPath } from "../../../routes/paths";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <p>
                    На Вашу почту <span style={{ fontFamily: "monospace", fontWeight: "bold" }}>{email}</span> был
                    выслан одноразовый код для восстановления доступа. Введите его для сброса пароля.
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

                <LoadingButton
                    disabled={!isResetCodeValid}
                    loading={isActionInProgress}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onInputResetCode}
                >
                    Отправить
                </LoadingButton>
            </Box>
        </Container>
    );
}
