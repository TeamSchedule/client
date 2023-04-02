import React, { useEffect, useMemo, useState } from "react";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import buildFilterParams from "../../../api/utils/buildFilterParams";
import AdaptiveCalendar from "../calendarViews/AdaptiveCalendar";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { CalendarElemTypeEnum } from "../../../enums/common";
import useApiCall from "../../../hooks/useApiCall";
import { API } from "../../../api/api";

export default function FullCalendar() {
    // начало просматриваемого месяца
    const [viewedDate, setViewedDate] = useState<Date>(new Date()); // дата, в диапазоне которой показываются задачи
    const [chosenDate, setChosenDate] = useState<Date>(new Date()); // выбранный день, для него показываюся задачи на мобильной версии

    // все события
    const getEventsApiCall = useApiCall<EventResponseItemSchema[]>(() => API.events.all(), []);

    const [displayedEvents, setDisplayedEvents] = useState<EventResponseItemSchema[]>(getEventsApiCall.data);

    //текущие фильтры
    const [filterObject, setFilterObject] = useState<FilterTasksParamsSchema>(buildFilterParams(viewedDate));
    const params = useMemo(() => filterObject, [filterObject]);

    /*
     * Запросить задачи с сервера в соответствии с фильтрами в `params`
     * */
    const getTasksApiCall = useApiCall<TaskResponseItemSchema[]>(() => API.tasks.getTasks(params), [], [params]);

    const [displayedTasks, setDisplayedTasks] = useState<TaskResponseItemSchema[]>([]);

    useEffect(() => {
        const setEvents = () => {
            if (!filterObject.status) {
                setDisplayedEvents(getEventsApiCall.data);
            } else {
                setDisplayedEvents(getEventsApiCall.data.filter((event) => event.status === filterObject.status));
            }
        };

        // @ts-ignore
        if (!filterObject.type || filterObject.type === CalendarElemTypeEnum.ALL) {
            setEvents();
            setDisplayedTasks(getTasksApiCall.data);
        } else if (filterObject.type === CalendarElemTypeEnum.TASK) {
            setDisplayedEvents([]);
            setDisplayedTasks(getTasksApiCall.data);
        } else if (filterObject.type === CalendarElemTypeEnum.EVENT) {
            setEvents();
            setDisplayedTasks([]);
        }
    }, [getTasksApiCall.data, getEventsApiCall.data, filterObject]);

    return (
        <>
            <AdaptiveCalendar
                tasks={displayedTasks}
                setTasks={getTasksApiCall.setData}
                events={displayedEvents}
                setEvents={setDisplayedEvents}
                viewedDate={viewedDate}
                setViewedDate={setViewedDate}
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
                setFilterObject={setFilterObject}
            />
        </>
    );
}
