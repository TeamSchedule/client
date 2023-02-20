import * as React from "react";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useAuth from "../../hooks/useAuth";
import { forgotPasswordPath, registrationPath } from "../../routes/paths";
import ErrorMsg from "../ErrorMsg";
import { ERRORS } from "../../consts";
import { SignInRequestSchema } from "../../api/schemas/requests/auth";
import { API } from "../../api/api";
import { TokenPair } from "../../api/schemas/responses/auth";
import { ACCESS_TOKEN_STORAGE_NAME, REFRESH_TOKEN_STORAGE_NAME } from "../../api/config";
import { UserSchema } from "../../api/schemas/responses/users";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isActionInProgress, setIsActionInProgress] = useState<boolean>(false);
    const [isWrongCredentials, setIsWrongCredentials] = useState<boolean>(false);
    const [isServiceUnavailableErrShown, setIsServiceUnavailableErrShown] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsActionInProgress(true);
        const signInRequestData: SignInRequestSchema = {
            email: email,
            password: password,
        };

        API.auth
            .signIn(signInRequestData)
            .then((tokens: TokenPair) => {
                localStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, tokens.access);
                localStorage.setItem(REFRESH_TOKEN_STORAGE_NAME, tokens.refresh);

                API.users.getUser().then((user: UserSchema) => {
                    login(user);
                });
            })
            .catch((err) => {
                const statusCode = err.response ? err.response.status : 500;
                if (statusCode >= 500) {
                    setIsWrongCredentials(false);
                    setIsServiceUnavailableErrShown(true);
                } else if (statusCode >= 400) {
                    setIsWrongCredentials(true);
                    setIsServiceUnavailableErrShown(false);
                }
            })
            .finally(() => {
                setPassword("");
                setIsActionInProgress(false);
            });
    };

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
                    Войти
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        helperText="*****@mail.sfu-kras.ru"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <ErrorMsg errText={ERRORS.SignIn.WrongCredentials} visible={isWrongCredentials} />
                    <ErrorMsg errText={ERRORS.Service.ServiceUnavailable} visible={isServiceUnavailableErrShown} />

                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={isActionInProgress}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Войти
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <Link href={forgotPasswordPath} variant="body1">
                                Забыли пароль?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                onClick={() => navigate(registrationPath)}
                                variant="body1"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                Зарегистрироваться
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
