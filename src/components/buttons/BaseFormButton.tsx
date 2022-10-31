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

export interface BaseFormButtonProps {
    btnText: string;
    onClick?: (event: React.FormEvent) => void;
    disabled?: boolean;
    className?: string;
    fullWidth?: boolean;
    loading?: boolean;
    color?: string;
    variant?: string;
}

function BaseFormButton({
    btnText,
    onClick,
    disabled = false,
    className = "",
    fullWidth = true,
    color = "success",
    variant = "contained",
    loading = false,
}: BaseFormButtonProps) {
    /*
     * Базовый компонент кнопок
     * */
    return (
        <>
            {/*@ts-ignore*/}
            <Button
                color={color}
                variant={variant}
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
