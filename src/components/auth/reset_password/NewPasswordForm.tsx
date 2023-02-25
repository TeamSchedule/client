import React, { FormEvent, useEffect, useState } from "react";
import { CreateNewPasswordRequestSchema } from "../../../api/schemas/requests/auth";
import { API } from "../../../api/api";
import { ERRORS, MIN_PASSWORD_LENGTH } from "../../../consts";
import ErrorMsg from "../../ErrorMsg";
import useAuth from "../../../hooks/useAuth";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function NewPasswordForm() {
    /*
     * Форма для создания пароля после сброса.
     * */
    const { login } = useAuth();

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
                setPassword("");
                setPassword2("");
                API.users
                    .getUser()
                    .then(login)
                    .catch(() => {});
            })
            .catch(() => {
                setIsNewPasswordErrShown(true);
            })
            .finally(() => {
                setIsActionInProgress(false);
                login({});
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
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="dense"
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    sx={{ mt: 2 }}
                />
                <TextField
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    margin="dense"
                    required
                    fullWidth
                    name="password"
                    label="Повторите пароль"
                    type="password"
                    id="password"
                    autoComplete="new-password"
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

                <LoadingButton
                    disabled={!isPasswordsOK}
                    loading={isActionInProgress}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onInputNewPassword}
                >
                    Сохранить пароль
                </LoadingButton>
            </Box>
        </Container>
    );
}
