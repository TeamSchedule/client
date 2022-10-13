import React from "react";
import { TextField } from "@mui/material";

export default function InputTextFormItem({ label, value, handleChange, className }) {
    return (
        <>
            <TextField
                id="standard-basic"
                label={label}
                variant="filled"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                fullWidth={true}
                className={className}
            />
        </>
    );
}
