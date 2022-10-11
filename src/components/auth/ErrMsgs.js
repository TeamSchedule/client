import Typography from "@mui/material/Typography";
import React from "react";

function BaseAuthFormErrorMsg({ errText }) {
    return (
        <>
            <Typography color={"red"} fontSize="md" pb={1}>
                {errText}
            </Typography>
        </>
    );
}

export function WrongCredentialsErrorMsg({ visible = true }) {
    const errMessage = "Неправильный логин или пароль";
    return visible ? <BaseAuthFormErrorMsg errText={errMessage} /> : null;
}

export function ServiceUnavailableErrorMsg({ visible = true }) {
    const errMessage = "Сервис недоступен, попробуйте позже";
    return visible ? <BaseAuthFormErrorMsg errText={errMessage} /> : null;
}

export function NameAlreadyExistErrorMsg({ visible = true }) {
    const errMessage = "Это имя уже занято";
    return visible ? <BaseAuthFormErrorMsg errText={errMessage} /> : null;
}
