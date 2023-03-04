import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

interface GoBackButtonProps {
    to?: string;
    buttonText?: string;
}

const DefaultButtonText: string = "Вернуться назад";

export default function GoBackButton(props: GoBackButtonProps) {
    /*
     * Кнопка для возврата назад.
     * */
    const navigate = useNavigate();

    return (
        <Button fullWidth onClick={() => navigate(props.to || "..")} variant="outlined" sx={{ mt: 4 }}>
            {props.buttonText || DefaultButtonText}
        </Button>
    );
}
