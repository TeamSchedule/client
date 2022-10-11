import React, { useState } from "react"
import { AuthEmailInput, AuthPasswordInput } from "../../../auth/auth-form-items"
import { useSelector } from "react-redux"
import { selectUserInfo } from "../../../../features/userInfoSlice"
import { API } from "../../../../api/api"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router"
import SuccessFormButton from "../../../buttons/SuccessFormButton"

export default function SettingsTab() {
    const userInfo = useSelector(selectUserInfo)

    const navigate = useNavigate()
    const [email, setEmail] = useState(userInfo.email || "")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    function changeUserInfo(e) {
        e.preventDefault()

        API.users
            .update({
                password: password,
                password2: password2,
                email: email,
            })
            .then(() => {})
    }

    return (
        <form action="src/components/main/profilePage/tabs/SettingsTab#" onSubmit={changeUserInfo}>
            <div className="mb-4">
                <h4>Изменить профиль</h4>
                <hr />
                <Button
                    variant="outlined"
                    onClick={() => navigate("../avatar", { replace: true })}
                    fullWidth={true}
                >
                    Сменить аватар
                </Button>
            </div>

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
    )
}
