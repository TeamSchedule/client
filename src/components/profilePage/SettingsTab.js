import React, { useState } from "react";
import { AuthEmailInput, AuthPasswordInput } from "../auth/auth-form-items";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userInfoSlice";
import SuccessFormButton from "../buttons/SuccessFormButton";

export default function SettingsTab() {
    const userInfo = useSelector(selectUserInfo);

    const [email, setEmail] = useState(userInfo.email || "");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    function changeUserInfo(e) {
        e.preventDefault();
    }

    return (
        <form onSubmit={changeUserInfo}>
            <div className="mb-4">
                <hr />
                <AuthEmailInput value={email} setValue={setEmail} />

                <AuthPasswordInput
                    value={password}
                    setValue={setPassword}
                    labelText={"Новый пароль"}
                />
                <AuthPasswordInput
                    value={password2}
                    setValue={setPassword2}
                    labelText={"Сменить пароль"}
                />
                <SuccessFormButton btnText="СОХРАНИТЬ" onClick={changeUserInfo} />
            </div>
        </form>
    );
}
