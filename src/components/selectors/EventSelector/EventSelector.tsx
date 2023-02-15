import { useEffect, useState } from "react";
import { eventsData } from "../../../testdata/data";
import { API } from "../../../api/api";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { Autocomplete, TextField } from "@mui/material";

interface EventSelectorProps {
    setInputValue: (event: EventResponseItemSchema) => void;
    inputValue: EventResponseItemSchema | null;
    disabled?: boolean;
}

export default function EventSelecLtor(props: EventSelectorProps) {
    const [events, setEvents] = useState<EventResponseItemSchema[]>(eventsData);

    useEffect(() => {
        API.events
            .all()
            .then((events: EventResponseItemSchema[]) => {
                setEvents(events);
            })
            .catch(() => {});
    }, []);

    return (
        <>
            <Autocomplete
                id="event-selector"
                disabled={props.disabled}
                autoHighlight
                fullWidth
                options={events}
                renderOption={(props, option: EventResponseItemSchema) => {
                    return (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    );
                }}
                getOptionLabel={(option: EventResponseItemSchema) => option.name}
                value={props.inputValue}
                onChange={(e, value) => {
                    props.setInputValue(value as any);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Выберите событие"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-event", // disable autocomplete and autofill
                        }}
                    />
                )}
            />
        </>
    );
}
