import React from "react";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

function CircularLoading() {
    /* Кружочек-индикатор загрузки */
    return (
        <>
            <CircularProgress color="inherit" size={25} />
        </>
    );
}

function BaseFormButton({
    btnText,
    onClick = null,
    disabled = false,
    className = "",
    fullWidth = true,
    color = "success",
    variant = "contained",
    loading = false,
}) {
    /*
     * Базовый компонент кнопок
     * */
    return (
        <>
            <Button
                variant={variant}
                color={color}
                className={className}
                fullWidth={fullWidth}
                type="submit"
                onClick={onClick}
                disabled={disabled}
            >
                {loading ? <CircularLoading /> : btnText}
            </Button>
        </>
    );
}

export default BaseFormButton;
