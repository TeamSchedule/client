import { LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DateInputProps {
    value: Date | null;
    handleChange: (value: Date | null) => void;
}

export default function DateInput(props: DateInputProps) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DatePicker
                    label="Дата завершения события"
                    disablePast
                    inputFormat="DD-MM-YYYY"
                    value={props.value}
                    onChange={(v) => props.handleChange(v)}
                    renderInput={(params) => <TextField {...params} className="w-100" />}
                />
            </LocalizationProvider>
        </>
    );
}
