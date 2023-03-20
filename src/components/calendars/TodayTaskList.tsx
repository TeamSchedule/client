import { TaskResponseItemSchema } from "../../api/schemas/responses/tasks";
import { getDateRepresentation, isEqualYearMonthDate } from "../../utils/dateutils";
import TaskPreview from "../tasks/TaskPreview";
import React from "react";
import Typography from "@mui/material/Typography";
import { compareTasks } from "../../utils/taskUtils";

interface todayTaskListProps {
    day: Date;
    tasks: TaskResponseItemSchema[];
}

export function TodayTaskList(props: todayTaskListProps) {
    const todayDateStr: string = props.day ? getDateRepresentation(props.day) : "";

    const dayTasks: TaskResponseItemSchema[] = props.tasks.filter((task) =>
        isEqualYearMonthDate(new Date(task.expirationTime), props.day)
    );

    return (
        <>
            {dayTasks.length === 0 && (
                <Typography variant="subtitle1" component="p" className="text-center">
                    На&nbsp;{todayDateStr}&nbsp;задач нет
                </Typography>
            )}

            {dayTasks.length > 0 && (
                <Typography variant="subtitle1" component="p" className="text-center">
                    Задачи на {todayDateStr}
                </Typography>
            )}

            {dayTasks.sort(compareTasks).map((task) => (
                <div className="mb-2" key={task.id}>
                    <TaskPreview key={task.id} task={task} />
                </div>
            ))}
        </>
    );
}
