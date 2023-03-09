import DateInput from "../DateInput";
import TimeInput from "../TimeInput";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TimeUnit } from "../TimeInput/TimeInput";

interface FullDatetimeInputProps {
    value: Date;
    handleChange: (value: Date | null) => void;
}

export default function FullDatetimeInput(props: FullDatetimeInputProps) {
    const [deadlineTime, setDeadlineTime] = useState<TimeUnit>(
        props.value
            ? {
                  h: props.value.getHours(),
                  m: Math.floor((props.value.getMinutes() + 7) / 15) * 15,
              }
            : { h: new Date().getHours() + 1, m: 0 }
    );

    function updateTime() {
        let nd: Date = props.value;
        nd.setHours(deadlineTime.h);
        nd.setMinutes(deadlineTime.m);
        props.handleChange(nd);
    }

    useEffect(() => {
        updateTime();
        /* eslint-disable */
    }, []);

    useEffect(() => {
        updateTime();
        /* eslint-disable */
    }, [deadlineTime]);

    return (
        <Box sx={{ display: "flex" }}>
            <DateInput value={props.value} handleChange={props.handleChange} />
            <TimeInput value={deadlineTime} setValue={setDeadlineTime} />
        </Box>
    );
}
