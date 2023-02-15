import { useNavigate } from "react-router-dom";
import { makeUnitLinkById } from "../../../routes/paths";
import styles from "../Link.module.scss";
import Typography from "@mui/material/Typography";
import SkeletonWrapper from "../../SkeletonWrapper";

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
            <span className={styles.link} onClick={onClick}>
                <Typography variant="subtitle1" component="span">
                    {props.name ? props.name : <SkeletonWrapper />}
                </Typography>
            </span>
        </>
    );
}
