import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { API } from "../../api/api"
import {
    AuthEmailInput,
    AuthForm,
    AuthPasswordInput,
    AuthUsernameInput,
    FormFooter,
    FormHeader,
} from "./auth-form-items"
import "./auth.css"
import SuccessFormButton from "../buttons/SuccessFormButton"

export default function RegisterForm() {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function signup(e) {
        e.preventDefault()

        API.auth
            .signUp({
                email: email,
                login: username,
                password: password,
            })
            .then(() => {
                setPassword("")
                navigate("/login")
            })
    }

    return (
        <>
            <AuthForm
                onSubmit={signup}
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

                        <SuccessFormButton btnText="ЗАРЕГИСТРИРОВАТЬСЯ" />
                        <FormFooter
                            toggleAuthFormLink={
                                <Link to="/login">Уже зарегистрировались? Войти</Link>
                            }
                        />
                    </>
                }
            />
        </>
    )
}
