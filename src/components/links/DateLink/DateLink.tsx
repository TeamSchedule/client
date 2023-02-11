import styles from "../Link.module.scss";
import { useNavigate } from "react-router-dom";
import { makeDateLink } from "../../../routes/paths";
import Typography from "@mui/material/Typography";
import SkeletonWrapper from "../../SkeletonWrapper";
import { getDateRepresentation } from "../../../utils/dateutils";

interface DateLinkProps {
    date: Date | undefined;
}

export default function DateLink(props: DateLinkProps) {
    const navigate = useNavigate();

    function onClick(e: React.MouseEvent<any>) {
        e.stopPropagation();
        if (!props.date) return;
        navigate(makeDateLink(props.date));
    }

    return (
        <span onClick={onClick} className={styles.link}>
            <Typography variant="subtitle1" component="div">
                {props.date ? getDateRepresentation(props.date) : <SkeletonWrapper />}
            </Typography>
        </span>
    );
}
