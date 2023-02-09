import React, { useState } from "react";
import MobileCalendar from "../MobileCalendar";
import { TaskResponseSchema } from "../../../api/schemas/responses/tasks";
import TaskPreview from "../../tasks/TaskPreview/TaskPreview";
import { task } from "../../../testdata/data";

export default function FullCalendarMobileView() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date()); // дата, для которой показываются задачи

    return (
        <>
            <MobileCalendar value={currentDate} handleChange={setCurrentDate} />
            <DayTaskList day={currentDate} tasks={[task, task]} />
        </>
    );
}

interface DayTaskListProps {
    tasks: Array<TaskResponseSchema>;
    day: Date;
}

function DayTaskList(props: DayTaskListProps) {
    const todayDateStr: string = props.day ? props.day.toLocaleDateString() : "";

    if (props.tasks.length === 0) {
        return (
            <>
                <div>
                    <p>На&nbsp;{todayDateStr}&nbsp;задач нет</p>
                </div>
            </>
        );
    }

    return (
        <>
            <div>
                <p>задачи на {todayDateStr}</p>

                {props.tasks.map((task) => (
                    <div className="mb-2">
                        <TaskPreview key={task.id} task={task} />
                    </div>
                ))}
            </div>
        </>
    );
}
