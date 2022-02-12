import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";

import Login from "../../../auth/LoginForm";
import {API} from "../../../../api-server/api";
import {selectUserInfo} from "../../../../features/userInfoSlice";

import "./profile.css";


function MatchPasswordsErr(props) {
    if (props.visible) {
        return (
            <p className="inputErrMsg mt-2">Passwords do not match</p>
        );
    }
    return null;
}


function SuccessfulUpdateMsg(props) {
    if (props.visible) {
        return (
            <p className="successMsg mt-2">Changes are saved</p>
        );
    }
    return null;
}


function ProfilePage() {
    const userInfo = useSelector(selectUserInfo);

    const [formValid, setFormValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [successMsgVisibility, setSuccessMsgVisibility] = useState(false);


    useEffect(() => {
        // document.getElementById("username").value = userInfo.username;
        document.getElementById("password").value = '';
        document.getElementById("password2").value = '';
        document.getElementById("email").value = userInfo.email;
    }, [userInfo.email, userInfo.username]);


    function onDataChanged() {
        setSuccessMsgVisibility(false);
    }

    function onPasswordsChange() {
        let p1 = document.getElementById("password").value;
        let p2 = document.getElementById("password2").value;
        setPasswordValid((p1 === p2));
        setFormValid(passwordValid);
    }


    function changeUserInfo(e) {
        e.preventDefault();

        let data = {
            // "login": document.getElementById("username").value,
            // "password": document.getElementById("password").value,
            // "password2": document.getElementById("password2").value,
            "email": document.getElementById("email").value,
        };

        API.users.updateUserInfo(data).then(res => {
            setSuccessMsgVisibility(true);
        });
        setSuccessMsgVisibility(true);

    }

    return (
        <div className="row flex-column p-3 m-0 profile">
            <h1 className="profilePageTitle text-center mt-4">Profile of <i>{userInfo.username}</i></h1>

            <form className="col-sm-12 col-md-6 col-lg-4 col-xl-3 m-auto" action="#" onSubmit={(e) => {
                changeUserInfo(e);
            }}>
                <div className="d-flex flex-column mt-3">
                    <label htmlFor="email">Email address</label>
                    <input className="py-1 mt-1"
                           type="email"
                           id="email"
                           name="email"
                           onChange={() => {
                               onDataChanged()
                           }}
                    />
                </div>

                <div className="d-flex flex-column mt-3">
                    <label htmlFor="password" className="password">New password</label>
                    <input className="py-1 mt-1" type="password" id="password" name="password" onChange={() => {
                        onPasswordsChange();
                        onDataChanged();
                    }} />
                </div>

                <div className="d-flex flex-column mt-3">
                    <label htmlFor="password" className="password">Repeat password</label>
                    <input className="py-1 mt-1" type="password" id="password2" name="password2" onChange={() => {
                        onPasswordsChange();
                        onDataChanged();
                    }} />
                    <MatchPasswordsErr visible={!passwordValid} />
                </div>

                <button id="signupSubmit"
                        type="submit"
                        // disabled={formValid}
                        className={"w-100 mt-4 p-2 px-3 submit-button"}>Save changes
                </button>

                <SuccessfulUpdateMsg visible={successMsgVisibility} />

                <Routes>
                    <Route path="/login" element={<Login />} />;
                </Routes>
            </form>
        </div>

    );
}


export default ProfilePage;