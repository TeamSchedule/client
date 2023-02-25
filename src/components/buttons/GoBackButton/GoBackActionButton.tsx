import React from "react";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "../index";

interface GoBackButtonProps {
    buttonText?: string;
}

const DefaultButtonText: string = "Назад";

export default function GoBackButton(props: GoBackButtonProps) {
    /*
     * Кнопка для возврата назад.
     * */
    const navigate = useNavigate();

    function onClick() {
        navigate("..");
    }

    return (
        <BaseButton
            text={props.buttonText || DefaultButtonText}
            color="backdown"
            className="mt-4 w-100"
            onClick={onClick}
        />
    );
}
