import React from "react"
import Button from "@mui/material/Button"

function BaseFormButton({
    btnText,
    onClick = null,
    disabled = false,
    className = "",
    fullWidth = true,
    color = "success",
    variant = "contained",
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
                {btnText}
            </Button>
        </>
    )
}

export default BaseFormButton
