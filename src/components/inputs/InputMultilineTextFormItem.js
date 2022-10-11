import { TextField } from "@mui/material";

export default function InputMultilineTextFormItem({ label, value, handleChange, className }) {
    return (
        <>
            <TextField
                id="outlined-multiline-static"
                label={label}
                multiline
                rows={4}
                variant="filled"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                fullWidth={true}
                className={className}
            />
        </>
    );
}
