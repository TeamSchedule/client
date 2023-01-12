import Event from "../../../schemas/instances/events";
import EventLink from "../../links/EventLink/EventLink";

interface TaskEventProps {
    event: Event;
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
