import React from "react";
import BaseFormButton from "./BaseFormButton";

interface SuccessFormButtonProps {
    btnText: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    fullWidth?: boolean;
    loading?: boolean;
}
function SuccessFormButton({
    btnText,
    onClick,
    disabled = false,
    className = "",
    fullWidth = true,
    loading = false,
}: SuccessFormButtonProps) {
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
                loading={loading}
            />
        </>
    );
}

export default SuccessFormButton;
