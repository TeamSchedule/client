import React from "react";
import BaseFormButton from "./BaseFormButton";

function RemovalFormButton({
    btnText,
    onClick = null,
    disabled = false,
    className = "",
    fullWidth = true,
    loading = false,
}) {
    /*
     * Кнопка для "негативных" действий: "удалить", "покинуть" ...
     * */
    return (
        <>
            <BaseFormButton
                color="error"
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

export default RemovalFormButton;
