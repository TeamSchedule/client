import { TaskResponseItemSchema } from "../../api/schemas/responses/tasks";
import { getDateRepresentation, isEqualYearMonthDate } from "../../utils/dateutils";
import React from "react";
import Typography from "@mui/material/Typography";
import { compareTasks } from "../../utils/taskUtils";
import { EventResponseItemSchema } from "../../api/schemas/responses/events";
import { compareEvent } from "../../utils/eventUtils";
import { styled, Tab, Tabs } from "@mui/material";
import BaseTask from "../tasks/BaseTask";
import { observer } from "mobx-react-lite";
import eventStore from "../../store/EventStore";
import calendarStore from "../../store/CalendarStore";
import taskStore from "../../store/TaskStore";
import BaseEvent from "../events/BaseEvent";
import { EventViewModeEnum } from "../../enums/eventsEnums";
import { TaskViewModeEnum } from "../../enums/tasksEnums";

interface EventTabProps {
    label: string;
}

const EventTab = styled((props: EventTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
    width: "50%",
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    "&.Mui-selected": {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
    },
    "&.Mui-focusVisible": {
        backgroundColor: "rgba(100, 95, 228, 0.32)",
        borderColor: theme.palette.secondary.main,
    },
}));

export function TodayList() {
    // вкладки с задачами/событиями
    const [tab, setTab] = React.useState(0);

    const todayDateStr: string = calendarStore.getChosenDate ? getDateRepresentation(calendarStore.getChosenDate) : "";

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const dayTasks: TaskResponseItemSchema[] = taskStore.tasks.filter((task) =>
        isEqualYearMonthDate(new Date(task.expirationTime), calendarStore.getChosenDate)
    );

    const dayEvents: EventResponseItemSchema[] = eventStore.getDayEvents(calendarStore.getChosenDate);

    return (
        <>
            <Tabs value={tab} onChange={handleChangeTab} sx={{ width: "100%", mb: 1 }}>
                <Tab label={`Задачи ${dayTasks.length ? `(${dayTasks.length})` : ""}`} sx={{ width: "50%" }} />
                <EventTab label={`События ${dayEvents.length ? `(${dayEvents.length})` : ""}`} />
            </Tabs>

            {tab === 0 && <TodayTaskList todayDateStr={todayDateStr} dayTasks={dayTasks} />}
            {tab === 1 && <TodayEventList todayDateStr={todayDateStr} dayEvents={dayEvents} />}
        </>
    );
}

interface TodayTaskListProps {
    todayDateStr: string;
    dayTasks: TaskResponseItemSchema[];
}

const TodayTaskList = observer((props: TodayTaskListProps) => {
    return (
        <>
            {props.dayTasks.length === 0 && (
                <Typography variant="subtitle1" component="p" className="text-center">
                    {props.todayDateStr}&nbsp;задач нет
                </Typography>
            )}

            {props.dayTasks.length > 0 && (
                <Typography variant="subtitle1" component="p" className="text-center">
                    Задачи {props.todayDateStr}
                </Typography>
            )}

            {props.dayTasks.sort(compareTasks).map((task) => (
                <div className="mb-2" key={task.id}>
                    <BaseTask key={task.id} task={task} viewMode={TaskViewModeEnum.PREVIEW} />
                </div>
            ))}
        </>
    );
});

interface TodayEventListProps {
    todayDateStr: string;
    dayEvents: EventResponseItemSchema[];
}

const TodayEventList = observer((props: TodayEventListProps) => {
    return (
        <>
            {props.dayEvents.length === 0 && (
                <Typography variant="subtitle1" component="p" className="text-center">
                    {props.todayDateStr}&nbsp;событий нет
                </Typography>
            )}

            {props.dayEvents.length > 0 && (
                <Typography variant="subtitle1" component="p" className="text-center">
                    События {props.todayDateStr}
                </Typography>
            )}

            {props.dayEvents.sort(compareEvent).map((event) => (
                <div className="mb-2" key={event.id}>
                    <BaseEvent key={event.id} event={event} viewMode={EventViewModeEnum.PREVIEW} />
                </div>
            ))}
        </>
    );
});
