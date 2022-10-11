import React from "react"
import BaseFormButton from "./BaseFormButton"

function SuccessFormButton({
    btnText,
    onClick = null,
    disabled = false,
    className = "",
    fullWidth = true,
}) {
    /*
     * Кнопка для успешного выполнения: "добавить", "создать", "сохранить" ...
     * */
    return (
        <>
            <BaseFormButton
                btnText={btnText}
                onClick={onClick}
                disabled={disabled}
                className={className}
                fullWidth={fullWidth}
            />
        </>
    )
}

export default SuccessFormButton
