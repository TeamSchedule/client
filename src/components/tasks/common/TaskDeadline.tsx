import { Tooltip } from "@mui/material";
import { getDateRepresentation } from "../../../utils/dateutils";

interface TaskDeadlineProps {
    deadline: Date | undefined;
}

export default function TaskDeadline(props: TaskDeadlineProps) {
    return (
        <>
            <Tooltip title="Дедлайн задачи">
                <span>{props.deadline ? getDateRepresentation(props.deadline) : ""}</span>
            </Tooltip>
        </>
    );
}
