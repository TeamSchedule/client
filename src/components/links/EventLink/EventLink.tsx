import { useNavigate } from "react-router-dom";
import { makeEventLinkById } from "../../../routes/paths";
import styles from "../Link.module.scss";
import Typography from "@mui/material/Typography";
import SkeletonWrapper from "../../SkeletonWrapper";

interface EventLinkProps {
    eventId: number | undefined;
    eventName: string | undefined;
}

export default function EventLink(props: EventLinkProps) {
    const navigate = useNavigate();

    function onClick(e: React.MouseEvent<any>) {
        e.stopPropagation();
        if (!props.eventName || !props.eventId) return;
        navigate(makeEventLinkById(props.eventId), { state: { id: props.eventId } });
    }

    return (
        <>
            <span onClick={onClick} className={styles.link}>
                <Typography variant="subtitle1" component="div">
                    {props.eventName ? props.eventName : <SkeletonWrapper />}
                </Typography>
            </span>
        </>
    );
}
