import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import TaskName from "../common/TaskName";
import TaskDeadline from "../common/TaskDeadline";
import { taskData } from "../../../testdata/data";
import Executors from "../common/Executors";
import { BaseButton } from "../../buttons";
import EventLink from "../../links/EventLink/EventLink";
import UnitLink from "../../links/UnitLink/UnitLink";

export default function FullTaskView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState<TaskResponseItemSchema | undefined>(taskData);

    useEffect(() => {
        if (!id) {
            return;
        }
        API.tasks
            .getTaskById(+id)
            .then((task: TaskResponseItemSchema) => {
                setTask(task);
            })
            .catch(() => {})
            .finally(() => {});
    }, [id]);

    return (
        <>
            <div>
                <TaskName name={task?.name} />
                <TaskDeadline deadline={task ? new Date(task?.expirationTime) : undefined} />
                <EventLink id={task?.event.id} name={task?.event.name} />
                <UnitLink id={task?.department.id} name={task?.department.name} />
                <Executors users={task ? task.assignee : []} />
                <BaseButton text="Изменить" onClick={() => navigate("edit")} className="mt-2" color="common" />
            </div>
        </>
    );
}
