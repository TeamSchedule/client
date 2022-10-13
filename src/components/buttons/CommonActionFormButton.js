import React from "react";
import BaseFormButton from "./BaseFormButton";

function CommonActionFormButton({
    btnText,
    onClick = null,
    disabled = false,
    className = "",
    fullWidth = true,
    loading = false,
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
                loading={loading}
            />
        </>
    );
}

export default CommonActionFormButton;
