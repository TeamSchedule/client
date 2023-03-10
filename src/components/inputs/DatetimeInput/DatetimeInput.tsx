import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import "dayjs/locale/ru";

interface DatetimeInputProps {
    datetime: Date | null;
    setDatetime: (datetime: Date) => void;
}

export default function DatetimeInput(props: DatetimeInputProps) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <MobileDateTimePicker
                    ampm={false}
                    label={"Дата и время *"}
                    openTo="day"
                    value={props.datetime}
                    onChange={(e) => (e ? props.setDatetime(new Date(e)) : null)}
                    renderInput={(params) => <TextField size="small" {...params} sx={{ minWidth: "200px" }} />}
                />
            </LocalizationProvider>
        </>
    );
}
