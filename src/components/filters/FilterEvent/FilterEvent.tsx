import { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { Checkbox, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import styles from "../FilterItem.module.scss";

interface FilterEventProps {
    selectedValues: EventResponseItemSchema[];
    onChange: (value: EventResponseItemSchema[]) => void;
}

export default function FilterEvent(props: FilterEventProps) {
    const [events, setEvents] = useState<EventResponseItemSchema[]>([]);

    useEffect(() => {
        API.events
            .all()
            .then((events: EventResponseItemSchema[]) => {
                setEvents(events);
            })
            .catch(() => {})
            .finally(() => {});
    }, []);

    function onChangeSelectedEvent(event: SelectChangeEvent<EventResponseItemSchema[]>) {
        const val = event.target.value;
        if (typeof val !== "string") {
            props.onChange(val);
        }
    }

    return (
        <>
            <Select
                className={styles.filter}
                id="event-select"
                placeholder="События"
                multiple
                fullWidth
                displayEmpty
                // @ts-ignore
                renderValue={() => <span>События</span>}
                value={props.selectedValues}
                onChange={onChangeSelectedEvent}
            >
                {events.map((event) => (
                    <MenuItem key={event.id} value={event as any}>
                        <Checkbox checked={props.selectedValues.indexOf(event) > -1} />
                        {event.name}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}
