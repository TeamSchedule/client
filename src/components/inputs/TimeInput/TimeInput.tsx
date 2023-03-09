import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export interface TimeUnit {
    h: number;
    m: number;
}

function get2DigitsTimeRepresentation(time: TimeUnit): string {
    const hh: string = time.h < 10 ? "0" + time.h : time.h.toString();
    const mm: string = time.m < 10 ? "0" + time.m : time.m.toString();
    return `${hh}:${mm}`;
}

let times: Array<TimeUnit> = [];
for (let hour = 0; hour < 24; hour++) {
    for (let minutes = 0; minutes < 4; minutes++) {
        times.push({ h: hour, m: minutes * 15 } as TimeUnit);
    }
}

interface TimeInputProps {
    value: TimeUnit;
    setValue: (val: TimeUnit) => void;
}

export default function TimeInput(props: TimeInputProps) {
    function handleChange(event: SelectChangeEvent) {
        props.setValue(event.target.value as any);
    }

    return (
        <>
            <FormControl sx={{ minWidth: "110px", mx: 1 }} size="small">
                <InputLabel>Время</InputLabel>
                <Select
                    value={props.value as any}
                    label="Время"
                    onChange={handleChange}
                    renderValue={(value) => <>{get2DigitsTimeRepresentation(value as any)}</>}
                >
                    {times.map((time: TimeUnit) => (
                        <MenuItem key={get2DigitsTimeRepresentation(time)} value={time as any}>
                            {get2DigitsTimeRepresentation(time)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}
