import React from "react";
import BaseFormButton from "./BaseFormButton";

interface CommonActionFormButtonProps {
    btnText: string;
    onClick?: (event: React.FormEvent) => void;
    disabled?: boolean;
    className?: string;
    fullWidth?: boolean;
    loading?: boolean;
}

function CommonActionFormButton({
    btnText,
    onClick,
    disabled = false,
    className = "",
    fullWidth = true,
    loading = false,
}: CommonActionFormButtonProps) {
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
