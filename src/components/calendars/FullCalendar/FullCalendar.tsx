import React, { useEffect, useState } from "react";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { API } from "../../../api/api";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import buildFilterParams from "../../../api/utils/buildFilterParams";
import AdaptiveCalendar from "../calendarViews/AdaptiveCalendar";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { CalendarElemTypeEnum } from "../../../enums/common";

export default function FullCalendar() {
    // начало просматриваемого месяца
    const [viewedDate, setViewedDate] = useState<Date>(new Date()); // дата, в диапазоне которой показываются задачи
    const [chosenDate, setChosenDate] = useState<Date>(new Date()); // выбранный день, для него показываюся задачи на мобильной версии

    // все задачи в диапазоне нескольких месяцев в соответствии с фильтрами
    const [tasks, setTasks] = useState<TaskResponseItemSchema[]>([]);

    // все события
    const [events, setEvents] = useState<EventResponseItemSchema[]>([]);

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

    /*
     * Запросить события с сервера в соответствии со статусом
     * */
    function fetchSetEvents() {
        API.events
            .all()
            .then((events: EventResponseItemSchema[]) => {
                if (!filterObject.status) {
                    setEvents(events);
                } else {
                    setEvents(events.filter((event) => event.status === filterObject.status));
                }
            })
            .catch(() => {
                //    TODO: показать сообщение об ошибке
            })
            .finally(() => {});
    }

    function getSetData() {
        // @ts-ignore
        if (!filterObject.type || filterObject.type === CalendarElemTypeEnum.ALL) {
            fetchSetTasks();
            fetchSetEvents();
        } else if (filterObject.type === CalendarElemTypeEnum.TASK) {
            fetchSetTasks();
            setEvents([]);
        } else if (filterObject.type === CalendarElemTypeEnum.EVENT) {
            fetchSetEvents();
            setTasks(() => []);
        }
    }

    useEffect(() => {
        // запрашиваем еще задач, если пользователь далеко прокликнул в календаре или при изменение фильтров
        getSetData();

        /* eslint-disable */
    }, [viewedDate, filterObject]);

    return (
        <>
            <AdaptiveCalendar
                tasks={tasks}
                setTasks={setTasks}
                events={events}
                setEvents={setEvents}
                viewedDate={viewedDate}
                setViewedDate={setViewedDate}
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
                setFilterObject={setFilterObject}
            />
        </>
    );
}
