import { useNavigate } from "react-router-dom";
import { makeEventLinkById } from "../../../routes/paths";
import Typography from "@mui/material/Typography";
import SkeletonWrapper from "../../SkeletonWrapper";
import { IconButton } from "@mui/material";
import Link from "@mui/material/Link";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

interface EventLinkProps {
    id?: number;
    name?: string;
    color?: string;
}

export default function EventLink(props: EventLinkProps) {
    const navigate = useNavigate();

    function onClick(e: React.MouseEvent<any>) {
        e.stopPropagation();
        if (!props.name || !props.id) return;
        navigate(makeEventLinkById(props.id), { state: { id: props.id } });
    }

    return (
        <>
            <Typography variant="body1" component="div">
                <IconButton>
                    <LocalActivityIcon sx={{ color: props.color || "" }} />
                </IconButton>
                <Link component="button" variant="body2" onClick={onClick}>
                    {props.name ? props.name : <SkeletonWrapper />}
                </Link>
            </Typography>
        </>
    );
}
