import React, { useEffect, useState } from "react";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { API } from "../../../api/api";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import buildFilterParams from "../../../api/utils/buildFilterParams";
import DayTaskListMobile from "../dayTasksSections/DayTaskListMobile";
import AdaptiveCalendar from "../calendarViews/AdaptiveCalendar";
import Box from "@mui/material/Box";

export default function FullCalendar() {
    // начало просматриваемого месяца
    const [viewedDate, setViewedDate] = useState<Date>(new Date()); // дата, в диапазоне которой показываются задачи
    const [chosenDate, setChosenDate] = useState<Date>(new Date()); // выбранный день, для него показываюся задачи на мобильной версии

    // все задачи в диапазоне нескольких месяцев
    const [tasks, setTasks] = useState<TaskResponseItemSchema[]>([]);
    // отображаемые задачи
    const [displayedTasks, setDisplayedTasks] = useState<TaskResponseItemSchema[]>([]);

    useEffect(() => {
        // запрашиваем еще задач, если пользователь далеко проликнул в календаре
        const params: FilterTasksParamsSchema = buildFilterParams(viewedDate);

        API.tasks
            .getTasks(params)
            .then((tasks: TaskResponseItemSchema[]) => {
                setTasks(tasks);
                setDisplayedTasks(tasks);
            })
            .catch(() => {
                //    TODO: показать сообщение об ошибке
            })
            .finally(() => {});
    }, [viewedDate]);

    return (
        <>
            <AdaptiveCalendar
                tasks={displayedTasks}
                viewedDate={viewedDate}
                setViewedDate={setViewedDate}
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
                setDisplayedTasks={setDisplayedTasks}
            />

            <Box
                sx={{
                    display: {
                        sx: "block",
                        md: "none",
                    },
                }}
            >
                <DayTaskListMobile day={chosenDate} tasks={displayedTasks} />
            </Box>
        </>
    );
}
