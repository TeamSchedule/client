import React from "react";
import BaseFormButton, { BaseFormButtonProps } from "./BaseFormButton";

function RemovalFormButton({
    btnText,
    onClick,
    disabled = false,
    className = "",
    fullWidth = true,
    loading = false,
}: BaseFormButtonProps) {
    /*
     * Кнопка для "негативных" действий: "удалить", "покинуть" ...
     * */
    return (
        <>
            {/*@ts-ignore*/}
            <BaseFormButton
                color="error"
                btnText={btnText}
                onClick={onClick}
                disabled={disabled}
                className={className}
                fullWidth={fullWidth}
                loading={loading}
                variant="contained"
            />
        </>
    );
}

export default RemovalFormButton;
