import React from "react";
import Alert from "@mui/material/Alert";

interface ErrorMsgProps {
    errText: string;
    visible?: boolean;
}

export default function ErrorMsg(props: ErrorMsgProps) {
    /*
     * Сообщение об ошибке в вводимых пользователем параметрах.
     * */
    return <>{props.visible && <Alert severity="error">{props.errText}</Alert>}</>;
}
