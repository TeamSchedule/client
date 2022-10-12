import React from "react";
import { useNavigate } from "react-router";
import BaseFormButton from "./BaseFormButton";

function GoBackActionButton({ btnText = "ВЕРНУТЬСЯ НАЗАД", className = "", fullWidth = true }) {
    /*
     * Кнопка для действий
     * */
    const navigate = useNavigate();

    function onClick() {
        navigate(-1);
    }

    return (
        <>
            <BaseFormButton
                color="primary"
                variant="outlined"
                btnText={btnText}
                onClick={onClick}
                className={className}
                fullWidth={fullWidth}
            />
        </>
    );
}

export default GoBackActionButton;
