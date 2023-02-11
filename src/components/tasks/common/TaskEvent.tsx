import EventLink from "../../links/EventLink/EventLink";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";

interface TaskEventProps {
    event: EventResponseItemSchema | undefined;
}

export default function TaskEvent(props: TaskEventProps) {
    return (
        <>
            <div className="d-flex align-items-center align-content-stretch justify-content-stretch">
                <span>Событие:&nbsp;</span>
                <EventLink eventId={props.event?.id} eventName={props.event?.name} />
            </div>
        </>
    );
}
