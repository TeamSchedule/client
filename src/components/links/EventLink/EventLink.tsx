import { useNavigate } from "react-router-dom";
import { makeEventLinkById } from "../../../routes/paths";
import styles from "../Link.module.scss";

interface EventLinkProps {
    eventId: number;
    eventName: string;
}

export default function EventLink(props: EventLinkProps) {
    const navigate = useNavigate();

    return (
        <>
            <span className={styles.link} onClick={() => navigate(makeEventLinkById(props.eventId))}>
                {props.eventName}
            </span>
        </>
    );
}
