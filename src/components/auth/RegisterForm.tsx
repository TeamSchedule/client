import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../api/api";
import {
    AuthEmailInput,
    AuthForm,
    AuthPasswordInput,
    AuthUsernameInput,
    FormFooter,
    FormHeader,
} from "./auth-form-items";
import SuccessFormButton from "../buttons/SuccessFormButton";
import { NameAlreadyExistErrorMsg, ServiceUnavailableErrorMsg } from "./ErrMsgs";
import { SignUpRequestSchema } from "../../api/schemas/requests/auth";
import "./auth.css";

export default function RegisterForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        <>
            <AuthForm
                onSubmit={signUpHandler}
                innerForm={
                    <>
                        <FormHeader
                            headerText={
                                <>
                                    Зарегистрироваться в&nbsp;
                                    <Link to="/">Командном расписании</Link>&nbsp;!
                                </>
                            }
                        />

                        <AuthEmailInput value={email} setValue={setEmail} />
                        <AuthUsernameInput value={username} setValue={setUsername} />
                        <AuthPasswordInput value={password} setValue={setPassword} />

                        <NameAlreadyExistErrorMsg visible={isNameOccupiedErrShown} />
                        <ServiceUnavailableErrorMsg visible={isRegErrShown} />

                        <SuccessFormButton
                            btnText="ЗАРЕГИСТРИРОВАТЬСЯ"
                            loading={isActionInProgress}
                        />
                        <FormFooter
                            toggleAuthFormLink={
                                <Link to="/login">Уже зарегистрировались? Войти</Link>
                            }
                        />
                    </>
                }
            />
        </>
    );
}