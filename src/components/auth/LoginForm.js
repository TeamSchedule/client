import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';

import {API} from "../../api/api";
import {setAccessToken} from "../../api/axiosRequests";
import {login} from "../../features/isAuthSlice";
import {set} from "../../features/userInfoSlice";
import {
    AuthForm,
    AuthPasswordInput,
    AuthSubmitButton,
    AuthUsernameInput,
    FormFooter,
    FormHeader
} from "./auth-form-items";
import "./auth.css";


export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function signin(e) {
        e.preventDefault();

        API.auth.signIn({
            "login": username,
            "password": password,
        }).then(data => {
            setPassword("");
            const token = data.access;
            setAccessToken(token);
            localStorage.setItem("access", JSON.stringify(token));
            dispatch(login());

            API.users.getUserInfo()
                .then(res => {
                    dispatch(set(res.data.user));
                    navigate(`/${res.data.user.login}/profile`);
                });
        });
    }

    return (
        <AuthForm onSubmit={signin}
                  innerForm={
                      <>
                          <FormHeader headerText={
                              <>Sign in to&nbsp;<Link to="/">"Командное расписание"</Link>&nbsp;!</>
                          } />


                          <AuthUsernameInput value={username} setValue={setUsername} />
                          <AuthPasswordInput value={password} setValue={setPassword} />

                          <AuthSubmitButton btnText="Sign in" />
                          <FormFooter toggleAuthFormLink={<Link to="/signup">Don't have an account? Sign up</Link>} />
                      </>
                  } />
    );
}
