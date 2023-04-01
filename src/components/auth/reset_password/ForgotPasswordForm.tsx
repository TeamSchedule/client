import { useNavigate } from "react-router-dom";
import React, { FormEvent, useState } from "react";
import { validateEmailFormat } from "../../../utils/validateEmail";
import { API } from "../../../api/api";
import { ResetPasswordEmailRequestSchema } from "../../../api/schemas/requests/auth";
import { resetPasswordCodePath } from "../../../routes/paths";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

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
        setIsEmailValid(validateEmailFormat(email));
    }

    return (
        <>
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
                    <p>Введите Ваш email для восстановления досутпа</p>
                    <TextField
                        value={email}
                        onChange={(e) => onChangeEmail(e.target.value.trim())}
                        margin="normal"
                        required
                        error={email !== "" ? !isEmailValid : false}
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                    />

                    <LoadingButton
                        disabled={!isEmailValid}
                        loading={isActionInProgress}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={onInputResetEmail}
                    >
                        Получить код
                    </LoadingButton>
                </Box>
            </Container>
        </>
    );
}
