import EventLink from "../../links/EventLink/EventLink";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import Typography from "@mui/material/Typography";

interface TaskEventProps {
    event: EventResponseItemSchema | undefined;
}

export default function TaskEvent(props: TaskEventProps) {
    return (
        <>
            <div className="d-flex align-items-center align-content-stretch justify-content-stretch">
                <Typography>Событие:&nbsp;</Typography>
                <EventLink eventId={props.event?.id} eventName={props.event?.name} />
            </div>
        </>
    );
}
