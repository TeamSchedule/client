import { useNavigate } from "react-router-dom";
import { makeUnitLinkById } from "../../../routes/paths";
import styles from "../Link.module.scss";

interface UnitLinkProps {
    id: number;
    name: string;
}

export default function UnitLink(props: UnitLinkProps) {
    const navigate = useNavigate();

    return (
        <>
            <span className={styles.link} onClick={() => navigate(makeUnitLinkById(props.id))}>
                {props.name}
            </span>
        </>
    );
}
