import React, { useEffect, useState } from "react";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { CreateNewTaskPath } from "../../../routes/paths";
import { API } from "../../../api/api";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import buildFilterParams from "../../../api/utils/buildFilterParams";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FiltersDrawer from "../filters/FiltersDrawer";
import DayTaskList from "../dayTasksSections/DayTaskList";
import { tasksData } from "../../../testdata/data";
import Box from "@mui/material/Box";
import DayTaskListDesktop from "../dayTasksSections/DayTaskListDesktop";
import AdaptiveCalendar from "../calendarViews/AdaptiveCalendar";

export default function FullCalendarMobileView() {
    const navigate = useNavigate();

    // начало просматриваемого месяца
    const [viewedDate, setViewedDate] = useState<Date>(new Date()); // дата, в диапазоне которой показываются задачи
    const [chosenDate, setChosenDate] = useState<Date>(new Date()); // выбранный день, для него показываюся задачи на мобильной версии

    // все задачи в диапазоне нескольких месяцев
    const [tasks, setTasks] = useState<TaskResponseItemSchema[]>(tasksData);
    // отображаемые задачи
    const [displayedTasks, setDisplayedTasks] = useState<TaskResponseItemSchema[]>(tasksData);

    useEffect(() => {
        // запрашиваем еще задач, если пользователь далеко проликнул в календаре
        const params: FilterTasksParamsSchema = buildFilterParams(viewedDate);

        API.tasks
            .getTasks(params)
            .then((tasks: TaskResponseItemSchema[]) => {
                setTasks(tasks);
            })
            .catch(() => {
                //    TODO: показать сообщение об ошибке
            })
            .finally(() => {});
    }, [viewedDate]);

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", mx: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={() => {
                        navigate(CreateNewTaskPath);
                    }}
                    color="secondary"
                    sx={{ mr: 2 }}
                >
                    Задача
                </Button>
                <FiltersDrawer tasks={tasks} setDisplayedTasks={setDisplayedTasks} />
            </Box>

            <AdaptiveCalendar
                tasks={displayedTasks}
                viewedDate={viewedDate}
                setViewedDate={setViewedDate}
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
            />

            <Box
                sx={{
                    display: {
                        sx: "block",
                        md: "none",
                    },
                }}
            >
                <DayTaskList day={chosenDate} tasks={displayedTasks} />
            </Box>
            <Box
                sx={{
                    display: {
                        sx: "none",
                        md: "block",
                    },
                }}
            >
                <DayTaskListDesktop day={chosenDate} tasks={displayedTasks} />
            </Box>
        </>
    );
}
