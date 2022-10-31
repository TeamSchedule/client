import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../api/api";
import {
    AuthEmailInput,
    AuthForm,
    AuthPasswordInput,
    AuthUsernameInput,
    FormBtn,
    FormFooter,
    FormHeader,
} from "./auth-form-items";
import { NameAlreadyExistErrorMsg, ServiceUnavailableErrorMsg } from "./ErrMsgs";
import { SignUpRequestSchema } from "../../api/schemas/requests/auth";
import "./Auth.module.scss";

export default function RegisterForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [isActionInProgress, setIsActionInProgress] = useState(false);
    const [isRegErrShown, setIsRegErrShown] = useState(false);
    const [isNameOccupiedErrShown, setIsNameOccupiedErrShown] = useState(false);

    function signUpHandler(event: React.FormEvent) {
        event.preventDefault();
        setIsActionInProgress(true);

        const signUpRequestData: SignUpRequestSchema = {
            email: email,
            login: username,
            password: password,
        };

        API.auth
            .signUp(signUpRequestData)
            .then(() => {
                setPassword("");
                navigate("/login");
            })
            .catch((err) => {
                const statusCode = err.response.status;
                if (statusCode >= 500) {
                    setIsNameOccupiedErrShown(false);
                    setIsRegErrShown(true);
                } else if (statusCode >= 400) {
                    setIsNameOccupiedErrShown(true);
                    setIsRegErrShown(false);
                }
            })
            .finally(() => {
                setIsActionInProgress(false);
            });
    }

    return (
        <AuthForm onSubmit={signUpHandler}>
            <>
                <FormHeader>
                    <>
                        Зарегистрироваться в&nbsp;
                        <Link to="/">Командном расписании</Link>&nbsp;!
                    </>
                </FormHeader>

                <AuthEmailInput value={email} setValue={setEmail} />
                <AuthUsernameInput value={username} setValue={setUsername} />
                <AuthPasswordInput value={password} setValue={setPassword} />
                <AuthPasswordInput value={password2} setValue={setPassword2} placeholder="Повторите пароль" />

                <NameAlreadyExistErrorMsg visible={isNameOccupiedErrShown} />
                <ServiceUnavailableErrorMsg visible={isRegErrShown} />

                <FormBtn text="Зарегистрироваться" />

                <FormFooter>
                    <>
                        Уже зарегистрировались?
                        <br></br>
                        <Link to="/login">Войти!</Link>
                    </>
                </FormFooter>
            </>
        </AuthForm>
    );
}
