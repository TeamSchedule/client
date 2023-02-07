import styles from "../Link.module.scss";
import { useNavigate } from "react-router-dom";
import { makeDateLink } from "../../../routes/paths";

interface DateLinkProps {
    date: Date;
}

export default function DateLink(props: DateLinkProps) {
    const navigate = useNavigate();

    // const dateStr = [props.date.getFullYear(), props.date.getMonth() + 1, props.date.getDate()].join("-");
    const dateStr = props.date.toLocaleDateString("ru-RU", { year: "numeric", month: "2-digit", day: "2-digit" });

    return (
        <>
            <span
                className={styles.link}
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(makeDateLink(props.date));
                }}
            >
                {dateStr}
            </span>
        </>
    );
}
