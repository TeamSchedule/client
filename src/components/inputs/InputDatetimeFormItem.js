import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import "dayjs/locale/ru";

export default function InputDatetimeFormItem({ value, handleChange, label }) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DateTimePicker
                    label={label}
                    ampm={false}
                    ampmInClock={false}
                    value={value}
                    onChange={(val) => handleChange(val.$d)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </>
    );
}
