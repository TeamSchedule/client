import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import styles from "./EventPreview.module.scss";
import { useNavigate } from "react-router-dom";
import { makeEventLinkById } from "../../../routes/paths";
import StatusBadge, { StatusBadgeEnum } from "../../StatusBadge/StatusBadge";

interface EventPreviewProps {
    event: EventResponseItemSchema;
}

export default function EventPreview(props: EventPreviewProps) {
    const navigate = useNavigate();

    return (
        <>
            <div
                className={styles.eventPreview}
                onClick={() => {
                    navigate(makeEventLinkById(props.event.id));
                }}
            >
                <StatusBadge text="Завершено" status={StatusBadgeEnum.Ok} />
                <div className={styles.colorBadge}></div>
                <div className="d-flex justify-content-between">
                    <span className={styles.eventName}>{props.event.name}</span>
                    <span>Задач: {props.event.tasks.length}</span>
                </div>
                <p>
                    Завершится&nbsp;
                    <span className={styles.eventEndDate}>{new Date(props.event.endDate).toLocaleDateString()}</span>
                </p>
                <span>{props.event.description}</span>
            </div>
        </>
    );
}
