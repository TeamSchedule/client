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
    return (
        <>
            {props.id && (
                <Typography variant="body1" component="p">
                    <Link
                        href={makeUnitLinkById(props.id)}
                        component="a"
                        variant="body2"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <IconButton sx={{ p: 0, pr: 1 }}>
                            <PeopleIcon />
                        </IconButton>
                        <Typography sx={{ fontSize: "0.9rem" }}>
                            {props.name ? props.name : <SkeletonWrapper />}
                        </Typography>
                    </Link>
                </Typography>
            )}
        </>
    );
}
