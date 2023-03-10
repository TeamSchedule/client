import { TaskResponseItemSchema } from "../../api/schemas/responses/tasks";
import { getDateRepresentation, isEqualYearMonthDate } from "../../utils/dateutils";
import TaskPreview from "../tasks/TaskPreview";
import React from "react";
import Typography from "@mui/material/Typography";

interface todayTaskListProps {
    day: Date;
    tasks: TaskResponseItemSchema[];
    setTasks: (tasks: TaskResponseItemSchema[]) => void;
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

            {dayTasks
                .sort((a, b) => {
                    return new Date(a.expirationTime).getTime() - new Date(b.expirationTime).getTime();
                })
                .map((task) => (
                    <div className="mb-2" key={task.id}>
                        <TaskPreview key={task.id} task={task} setTasks={props.setTasks} />
                    </div>
                ))}
        </>
    );
}
