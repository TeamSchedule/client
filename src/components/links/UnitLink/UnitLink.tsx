import { useNavigate } from "react-router-dom";
import { makeUnitLinkById } from "../../../routes/paths";
import Typography from "@mui/material/Typography";
import SkeletonWrapper from "../../SkeletonWrapper";
import PeopleIcon from "@mui/icons-material/People";
import Link from "@mui/material/Link";
import { IconButton } from "@mui/material";

interface UnitLinkProps {
    id: number | undefined;
    name: string | undefined;
}

export default function UnitLink(props: UnitLinkProps) {
    const navigate = useNavigate();

    function onClick(e: React.MouseEvent<any>) {
        e.stopPropagation();
        if (!props.id) return;
        navigate(makeUnitLinkById(props.id), { state: { id: props.id } });
    }

    return (
        <>
            <Typography variant="body1" component="div">
                <IconButton>
                    <PeopleIcon />
                </IconButton>
                <Link component="button" variant="body2" onClick={onClick}>
                    {props.name ? props.name : <SkeletonWrapper />}
                </Link>
            </Typography>
        </>
    );
}
