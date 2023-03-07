import React from "react";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { TodayTaskList } from "./common";

interface DayTaskListProps {
    day: Date;
    tasks: TaskResponseItemSchema[];
}

export default function DayTaskListMobile(props: DayTaskListProps) {
    return (
        <>
            <TodayTaskList {...props} />
        </>
    );
}
