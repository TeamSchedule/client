import React, {useState} from "react";
import {AuthEmailInput, AuthPasswordInput} from "../../../../auth/auth-form-items";
import {useSelector} from "react-redux";
import {selectUserInfo} from "../../../../../features/userInfoSlice";
import {API} from "../../../../../api/api";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";


export default function SettingsTab() {
    const userInfo = useSelector(selectUserInfo);

    const navigate = useNavigate();
    const [email, setEmail] = useState(userInfo.email || "");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");


    function changeUserInfo(e) {
        e.preventDefault();

        API.users.updateUserInfo({
            "password": password,
            "password2": password2,
            "email": email,
        }).then(() => {

        });
    }

    return (
        <form action="#" onSubmit={changeUserInfo}>
            <div className="mb-4">
                <h4>Edit profile</h4>
                <hr />
                <Button variant="outlined" onClick={() => navigate('../avatar', { replace: true })} fullWidth={true}>
                    Change avatar
                </Button>
            </div>

            <div className="mb-4">
                <h4>Change credentials</h4>
                <hr />
                <AuthEmailInput value={email} setValue={setEmail} />

                <AuthPasswordInput value={password} setValue={setPassword} labelText={"New password"} />
                <AuthPasswordInput value={password2} setValue={setPassword2} labelText={"Repeat password"} />

                <Button variant="contained" color="success" fullWidth={true} className="mt-3" onClick={changeUserInfo}>
                    Save changes
                </Button>
            </div>
        </form>
    );
}
