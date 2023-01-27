import { useNavigate } from "react-router-dom";
import styles from "./UnitPreview.module.scss";
import UserPreview from "../../users/UsersPreview/UserPreview";
import { UnitsResponseItemSchema } from "../../../api/schemas/responses/units";

interface UnitPreviewProps {
    unit: UnitsResponseItemSchema;
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
    tasks: Array<object>;
}

function OpenTasksLabel(props: OpenTasksLabelProps) {
    const openTaskNumber: number = props.tasks.length;
    if (openTaskNumber === 0) {
        return null;
    }

    return (
        <>
            <div>
                <p className={styles.openTasksLabel}>Открытых задач: {openTaskNumber}</p>
            </div>
        </>
    );
}
