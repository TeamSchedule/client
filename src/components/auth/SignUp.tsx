import * as React from "react";
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AllowedEmailDomain, ERRORS, MIN_PASSWORD_LENGTH } from "../../consts";
import validateEmail from "../../utils/validateEmail";
import { SignUpRequestSchema } from "../../api/schemas/requests/auth";
import { API } from "../../api/api";
import { loginPath, successRegistrationPath } from "../../routes/paths";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorMsg from "../ErrorMsg";

export default function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
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
        setIsFormDisabled(!isPasswordsOK || !isEmailValid);
    }, [isEmailValid, isPasswordsOK]);

    function onChangeEmail(email: string) {
        setEmail(email);
        setIsEmailValid(validateEmail(email));
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (isFormDisabled) return;
        if (!password) return;

        setIsActionInProgress(true);

        const signUpRequestData: SignUpRequestSchema = {
            email: email,
            password: password,
        };

        API.auth
            .signUp(signUpRequestData)
            .then(() => {
                setPassword("");
                navigate(successRegistrationPath, { state: { email: email } });
            })
            .catch((err) => {
                const statusCode = err.response.status;
                if (statusCode >= 500) {
                    setIsRegErrShown(true);
                } else if (statusCode >= 400) {
                    setIsRegErrShown(false);
                }
            })
            .finally(() => {
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
                <Typography component="h1" variant="h5">
                    Зарегистрироваться
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container>
                        <TextField
                            value={email}
                            onChange={(e) => onChangeEmail(e.target.value.trim())}
                            margin="normal"
                            required
                            error={email !== "" ? !isEmailValid : false}
                            fullWidth
                            id="email"
                            label="Email"
                            helperText={"*****" + AllowedEmailDomain}
                            name="email"
                            autoComplete="email"
                        />

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
                        <ErrorMsg errText={ERRORS.Service.ServiceUnavailable} visible={isRegErrShown} />
                    </Grid>

                    <LoadingButton
                        disabled={isFormDisabled}
                        loading={isActionInProgress}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Зарегистрироваться
                    </LoadingButton>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                onClick={() => navigate(loginPath)}
                                variant="body2"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                Уже есть аккаунт? Войти
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
