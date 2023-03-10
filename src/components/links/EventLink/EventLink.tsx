import { useNavigate } from "react-router-dom";
import { makeEventLinkById } from "../../../routes/paths";
import Typography from "@mui/material/Typography";
import SkeletonWrapper from "../../SkeletonWrapper";
import { IconButton } from "@mui/material";
import Link from "@mui/material/Link";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";

interface EventLinkProps {
    event?: EventResponseItemSchema;
}

export default function EventLink(props: EventLinkProps) {
    return (
        <>
            {props.event && (
                <Typography variant="body1" component="p">
                    <Link
                        href={makeEventLinkById(props.event?.id)}
                        component="a"
                        variant="body2"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <IconButton sx={{ p: 0, pr: 1 }}>
                            <LocalActivityIcon sx={{ color: props.event.color || "" }} />
                        </IconButton>
                        <Typography sx={{ fontSize: "0.9rem" }}>
                            {props.event.name ? props.event.name : <SkeletonWrapper />}
                        </Typography>
                    </Link>
                </Typography>
            )}
        </>
    );
}
