import React, { useEffect, useState } from "react";
import MobileCalendar from "../MobileCalendar";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { taskData } from "../../../testdata/data";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { CreateNewTaskPath } from "../../../routes/paths";
import { API } from "../../../api/api";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import buildFilterParams from "../../../api/utils/buildFilterParams";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FiltersDrawer from "../filters/FiltersDrawer";
import DayTaskList from "./DayTaskList";

export default function FullCalendarMobileView() {
    const navigate = useNavigate();

    // начало просматриваемого месяца
    const [viewedDate, setViewedDate] = useState<Date>(new Date()); // дата, в диапазоне которой показываются задачи
    const [chosenDate, setChosenDate] = useState<Date>(new Date()); // выбранный день, для него показываюся задачи на мобильной версии

    // все задачи в диапазоне нескольких месяцев
    const [tasks, setTasks] = useState<TaskResponseItemSchema[]>([taskData]);
    // отображаемые задачи
    const [displayedTasks, setDisplayedTasks] = useState<TaskResponseItemSchema[]>([]);

    useEffect(() => {
        const params: FilterTasksParamsSchema = buildFilterParams(viewedDate);

        API.tasks
            .getTasks(params)
            .then((tasks: TaskResponseItemSchema[]) => {
                setTasks(tasks);
            })
            .catch(() => {})
            .finally(() => {});
    }, []);

    return (
        <>
            <div className="d-flex justify-content-center">
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={() => {
                        navigate(CreateNewTaskPath);
                    }}
                    color="secondary"
                >
                    Задача
                </Button>
                <FiltersDrawer tasks={tasks} setDisplayedTasks={setDisplayedTasks} />
            </div>

            <MobileCalendar
                tasks={displayedTasks}
                viewedDate={viewedDate}
                setViewedDate={setViewedDate}
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
            />
            <DayTaskList day={chosenDate} tasks={tasks} />
        </>
    );
}
