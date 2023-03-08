import { useNavigate } from "react-router-dom";
import { makeEventLinkById } from "../../../routes/paths";
import Typography from "@mui/material/Typography";
import SkeletonWrapper from "../../SkeletonWrapper";
import { IconButton, Tooltip } from "@mui/material";
import Link from "@mui/material/Link";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";

interface EventLinkProps {
    event?: EventResponseItemSchema;
}

export default function EventLink(props: EventLinkProps) {
    const navigate = useNavigate();

    function onClick(e: React.MouseEvent<any>) {
        e.stopPropagation();
        if (!props.event?.name || !props.event?.id) return;
        navigate(makeEventLinkById(props.event?.id), { state: { id: props.event?.id } });
    }

    return (
        <>
            {props.event && (
                <Typography variant="body1" component="div">
                    <Tooltip title="Событие задачи">
                        <IconButton>
                            <LocalActivityIcon sx={{ color: props.event.color || "" }} />
                        </IconButton>
                    </Tooltip>

                    <Link component="button" variant="body2" onClick={onClick}>
                        {props.event.name ? props.event.name : <SkeletonWrapper />}
                    </Link>
                </Typography>
            )}
        </>
    );
}
