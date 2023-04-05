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

interface TodayListProps extends TodayTaskListProps, todayEventListProps {}

export function TodayList(props: TodayListProps) {
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

            {tab === 0 && <TodayTaskList day={props.day} tasks={props.tasks} setTasks={props.setTasks} />}
            {tab === 1 && <TodayEventList day={props.day} events={props.events} setEvents={props.setEvents} />}
        </>
    );
}

interface TodayTaskListProps {
    day: Date;
    tasks: TaskResponseItemSchema[];
    setTasks: (tasks: TaskResponseItemSchema[]) => void;
}

function TodayTaskList(props: TodayTaskListProps) {
    const todayDateStr: string = props.day ? getDateRepresentation(props.day) : "";

    const dayTasks: TaskResponseItemSchema[] = props.tasks.filter((task) =>
        isEqualYearMonthDate(new Date(task.expirationTime), props.day)
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
                    <BaseTask key={task.id} task={task} setTasks={props.setTasks} />
                </div>
            ))}
        </>
    );
}

interface todayEventListProps {
    day: Date;
    events: EventResponseItemSchema[];
    setEvents: (events: EventResponseItemSchema[]) => void;
}

function TodayEventList(props: todayEventListProps) {
    const todayDateStr: string = props.day ? getDateRepresentation(props.day) : "";

    const dayEvents: EventResponseItemSchema[] = props.events.filter((event) =>
        isEqualYearMonthDate(new Date(event.endDate), props.day)
    );

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
}
