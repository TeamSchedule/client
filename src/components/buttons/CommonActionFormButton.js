import React from "react";
import BaseFormButton from "./BaseFormButton";

function CommonActionFormButton({
    btnText,
    onClick = null,
    disabled = false,
    className = "",
    fullWidth = true,
}) {
    /*
     * Кнопка для действий
     * */
    return (
        <>
            <BaseFormButton
                color="primary"
                btnText={btnText}
                onClick={onClick}
                disabled={disabled}
                className={className}
                fullWidth={fullWidth}
            />
        </>
    );
}

export default CommonActionFormButton;
