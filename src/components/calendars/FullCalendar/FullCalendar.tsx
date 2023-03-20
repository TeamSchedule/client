import React, { useEffect, useMemo, useState } from "react";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import buildFilterParams from "../../../api/utils/buildFilterParams";
import AdaptiveCalendar from "../calendarViews/AdaptiveCalendar";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { CalendarElemTypeEnum } from "../../../enums/common";
import useEvents from "../../../hooks/useEvents";
import useTasks from "../../../hooks/useTasks";

export default function FullCalendar() {
    // начало просматриваемого месяца
    const [viewedDate, setViewedDate] = useState<Date>(new Date()); // дата, в диапазоне которой показываются задачи
    const [chosenDate, setChosenDate] = useState<Date>(new Date()); // выбранный день, для него показываюся задачи на мобильной версии

    // все события
    const { events } = useEvents();
    const [displayedEvents, setDisplayedEvents] = useState<EventResponseItemSchema[]>(events);

    //текущие фильтры
    const [filterObject, setFilterObject] = useState<FilterTasksParamsSchema>(buildFilterParams(viewedDate));

    const params = useMemo(() => filterObject, [filterObject]);

    /*
     * Запросить задачи с сервера в соответствии с фильтрами в `params`
     * */
    const { tasks } = useTasks({
        filterTaskObject: params,
    });
    const [displayedTasks, setDisplayedTasks] = useState<TaskResponseItemSchema[]>([]);

    useEffect(() => {
        const setEvents = () => {
            if (!filterObject.status) {
                setDisplayedEvents(events);
            } else {
                setDisplayedEvents(events.filter((event) => event.status === filterObject.status));
            }
        };

        // @ts-ignore
        if (!filterObject.type || filterObject.type === CalendarElemTypeEnum.ALL) {
            setEvents();
            setDisplayedTasks(tasks);
        } else if (filterObject.type === CalendarElemTypeEnum.TASK) {
            setDisplayedEvents([]);
            setDisplayedTasks(tasks);
        } else if (filterObject.type === CalendarElemTypeEnum.EVENT) {
            setEvents();
            setDisplayedTasks([]);
        }
    }, [tasks, events, filterObject]);

    return (
        <>
            <AdaptiveCalendar
                tasks={displayedTasks}
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
