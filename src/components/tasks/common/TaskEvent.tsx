import EventLink from "../../links/EventLink/EventLink";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";

interface TaskEventProps {
    event: EventResponseItemSchema;
}

export default function TaskEvent(props: TaskEventProps) {
    return (
        <>
            <div>
                <span>Событие:&nbsp;</span>
                <EventLink eventId={props.event.id} eventName={props.event.name} />
            </div>
        </>
    );
}
