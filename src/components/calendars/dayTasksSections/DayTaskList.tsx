import React from "react";
import Typography from "@mui/material/Typography";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { getDateRepresentation, isEqualYearMonthDate } from "../../../utils/dateutils";
import TaskPreview from "../../tasks/TaskPreview";

interface DayTaskListProps {
    day: Date;
    tasks: TaskResponseItemSchema[];
}

export default function DayTaskList(props: DayTaskListProps) {
    const todayDateStr: string = props.day ? getDateRepresentation(props.day) : "";

    const dayTasks: TaskResponseItemSchema[] = props.tasks.filter((task) =>
        isEqualYearMonthDate(new Date(task.expirationTime), props.day)
    );

    if (dayTasks.length === 0) {
        return (
            <Typography variant="subtitle1" component="p" className="text-center">
                На&nbsp;{todayDateStr}&nbsp;задач нет
            </Typography>
        );
    }

    return (
        <>
            <Typography variant="subtitle1" component="p" className="text-center">
                Задачи на {todayDateStr}
            </Typography>

            {dayTasks.map((task) => (
                <div className="mb-2" key={task.id}>
                    <TaskPreview key={task.id} task={task} />
                </div>
            ))}
        </>
    );
}
