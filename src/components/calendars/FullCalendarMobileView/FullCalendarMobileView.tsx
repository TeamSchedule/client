import React, { useEffect, useState } from "react";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { API } from "../../../api/api";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import buildFilterParams from "../../../api/utils/buildFilterParams";
import DayTaskListMobile from "../dayTasksSections/DayTaskListMobile";
import { tasksData } from "../../../testdata/data";
import Box from "@mui/material/Box";
import AdaptiveCalendar from "../calendarViews/AdaptiveCalendar";

export default function FullCalendarMobileView() {
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
            <Box
                sx={{
                    display: {
                        sx: "none",
                        md: "block",
                    },
                }}
            >
                {/*<DayTaskListDesktop day={chosenDate} tasks={displayedTasks} />*/}
            </Box>
        </>
    );
}
