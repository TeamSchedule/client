import { TaskResponseItemSchema } from "../../api/schemas/responses/tasks";
import { getDateRepresentation, isEqualYearMonthDate } from "../../utils/dateutils";
import React from "react";
import Typography from "@mui/material/Typography";
import { compareTasks } from "../../utils/taskUtils";
import { EventResponseItemSchema } from "../../api/schemas/responses/events";
import EventPreview from "../events/EventPreview/EventPreview";
import { compareEvent } from "../../utils/eventUtils";
import { Tab, Tabs } from "@mui/material";
import BaseTask from "../tasks/BaseTask";
import { observer } from "mobx-react-lite";
import eventStore from "../../store/EventStore";
import calendarStore from "../../store/CalendarStore";
import taskStore from "../../store/TaskStore";

export function TodayList() {
    // вкладки с задачами/событиями
    const [tab, setTab] = React.useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <>
            <Tabs value={tab} onChange={handleChangeTab} sx={{ width: "100%", mb: 1 }}>
                <Tab label="Задачи" sx={{ width: "50%" }} />
                <Tab label="События" sx={{ width: "50%" }} />
            </Tabs>

            {tab === 0 && <TodayTaskList />}
            {tab === 1 && <TodayEventList />}
        </>
    );
}

const TodayTaskList = observer(() => {
    const todayDateStr: string = calendarStore.getChosenDate ? getDateRepresentation(calendarStore.getChosenDate) : "";

    const dayTasks: TaskResponseItemSchema[] = taskStore.tasks.filter((task) =>
        isEqualYearMonthDate(new Date(task.expirationTime), calendarStore.getChosenDate)
    );

    return (
        <>
            {dayTasks.length === 0 && (
                <Typography variant="subtitle1" component="p" className="text-center">
                    {todayDateStr}&nbsp;задач нет
                </Typography>
            )}

            {dayTasks.length > 0 && (
                <Typography variant="subtitle1" component="p" className="text-center">
                    Задачи {todayDateStr}
                </Typography>
            )}

            {dayTasks.sort(compareTasks).map((task) => (
                <div className="mb-2" key={task.id}>
                    <BaseTask key={task.id} task={task} />
                </div>
            ))}
        </>
    );
});

const TodayEventList = observer(() => {
    const todayDateStr: string = calendarStore.getChosenDate ? getDateRepresentation(calendarStore.getChosenDate) : "";

    const dayEvents: EventResponseItemSchema[] = eventStore.getDayEvents(calendarStore.getChosenDate);

    return (
        <>
            {dayEvents.length === 0 && (
                <Typography variant="subtitle1" component="p" className="text-center">
                    {todayDateStr}&nbsp;событий нет
                </Typography>
            )}

            {dayEvents.length > 0 && (
                <Typography variant="subtitle1" component="p" className="text-center">
                    События {todayDateStr}
                </Typography>
            )}

            {dayEvents.sort(compareEvent).map((event) => (
                <div className="mb-2" key={event.id}>
                    <EventPreview key={event.id} event={event} />
                </div>
            ))}
        </>
    );
});
