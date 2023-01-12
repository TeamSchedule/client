import { TextField } from "@mui/material";

interface MultilineTextInputProps {
    label?: string;
    value: string;
    handleChange: (value: string) => void;
    className?: string;
}

export default function MultilineTextInput(props: MultilineTextInputProps) {
    return (
        <>
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label={props.label}
                    multiline
                    rows={4}
                    variant="outlined"
                    value={props.value}
                    onChange={(e) => props.handleChange(e.target.value)}
                    fullWidth={true}
                    className={props.className}
                />
            </div>
        </>
    );
}
