import { useNavigate } from "react-router-dom";
import styles from "./UnitPreview.module.scss";
import UserPreview from "../../users/UsersPreview/UserPreview";
import { Unit } from "../../../schemas/instances/units";

interface UnitPreviewProps {
    unit: Unit;
}

export default function UnitPreview(props: UnitPreviewProps) {
    const navigate = useNavigate();

    const members = props.unit.members.map((user) => <UserPreview key={user.id} user={user} />);

    return (
        <>
            <div
                className={styles.unit}
                onClick={() => {
                    navigate(props.unit.id.toString());
                }}
            >
                <div className={styles.unit__title}>{props.unit.name}</div>
                <OpenTasksLabel tasks={props.unit.openTasks} />
                {members}
            </div>
        </>
    );
}

interface OpenTasksLabelProps {
    tasks: number;
}

function OpenTasksLabel(props: OpenTasksLabelProps) {
    if (props.tasks === 0) {
        return null;
    }

    return (
        <>
            <div>
                <p className={styles.openTasksLabel}>Открытых задач: {props.tasks}</p>
            </div>
        </>
    );
}
