import React from "react";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "./index";

export default function GoBackActionButton() {
    /*
     * Кнопка для действий
     * */
    const navigate = useNavigate();

    function onClick() {
        navigate(-1);
    }

    return <BaseButton text="Вернуться" color="backdown" className="mt-4 w-100" onClick={onClick} />;
}
