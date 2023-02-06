import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateInputProps {
    value: Date | null;
    handleChange: (value: Date | null) => void;
}

export default function DateInput(props: DateInputProps) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <div className="d-none d-md-block">
                    <DesktopDatePicker
                        label="Дата завершения события"
                        disablePast
                        inputFormat="DD-MM-YYYY"
                        value={props.value}
                        onChange={(v) => props.handleChange(v)}
                        renderInput={(params) => <TextField {...params} className="w-100" />}
                    />
                </div>

                <div className="d-md-none">
                    <MobileDatePicker
                        label="Дата завершения события"
                        disablePast
                        inputFormat="DD-MM-YYYY"
                        value={props.value}
                        onChange={(v) => props.handleChange(v)}
                        renderInput={(params) => <TextField {...params} className="w-100" />}
                    />
                </div>
            </LocalizationProvider>
        </>
    );
}
