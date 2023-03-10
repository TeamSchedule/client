import React, { useEffect, useState } from "react";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { API } from "../../../api/api";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import buildFilterParams from "../../../api/utils/buildFilterParams";
import AdaptiveCalendar from "../calendarViews/AdaptiveCalendar";

export default function FullCalendar() {
    // начало просматриваемого месяца
    const [viewedDate, setViewedDate] = useState<Date>(new Date()); // дата, в диапазоне которой показываются задачи
    const [chosenDate, setChosenDate] = useState<Date>(new Date()); // выбранный день, для него показываюся задачи на мобильной версии

    // все задачи в диапазоне нескольких месяцев в соответствии с фильтрами
    const [tasks, setTasks] = useState<TaskResponseItemSchema[]>([]);

    //текущие фильтры
    const [filterObject, setFilterObject] = useState<FilterTasksParamsSchema>(buildFilterParams(viewedDate));

    /*
     * Запросить задачи с сервера в соответствии с фильтрами в `params`
     * */
    function fetchSetTasks() {
        API.tasks
            .getTasks(filterObject)
            .then((tasks: TaskResponseItemSchema[]) => {
                setTasks(tasks);
            })
            .catch(() => {
                //    TODO: показать сообщение об ошибке
            })
            .finally(() => {});
    }

    useEffect(() => {
        // запрашиваем еще задач, если пользователь далеко проликнул в календаре
        fetchSetTasks();
        /* eslint-disable */
    }, [viewedDate, filterObject]);

    return (
        <>
            <AdaptiveCalendar
                tasks={tasks}
                setTasks={setTasks}
                viewedDate={viewedDate}
                setViewedDate={setViewedDate}
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
                setFilterObject={setFilterObject}
            />
        </>
    );
}
