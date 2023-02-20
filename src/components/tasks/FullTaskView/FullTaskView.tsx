import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import TaskName from "../common/TaskName";
import TaskDeadline from "../common/TaskDeadline";
import { taskData } from "../../../testdata/data";
import Executors from "../common/Executors";
import EventLink from "../../links/EventLink/EventLink";
import UnitLink from "../../links/UnitLink/UnitLink";
import SpeedDial from "@mui/material/SpeedDial";
import EditIcon from "@mui/icons-material/Edit";

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
                <TaskDeadline deadline={task?.expirationTime ? new Date(task?.expirationTime) : undefined} />
                <EventLink id={task?.event.id} name={task?.event.name} />
                <UnitLink id={task?.department.id} name={task?.department.name} />
                <Executors users={task ? task.assignee : []} />
            </div>

            <SpeedDial
                ariaLabel="edit task"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                icon={<EditIcon />}
                onClick={() => {
                    navigate("edit");
                }}
            ></SpeedDial>
        </>
    );
}
