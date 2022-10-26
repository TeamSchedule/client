import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getNextDayDate } from "../../utils/getPrevDayDate";
import FilterColumn from "./FilterColumn";

import FullCalendar, { CalendarApi, EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

import { API } from "../../api/api";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./monthCalendar.css";
import LoaderScreen from "../generic/LoaderScreen";
import { FilterTasksParamsSchema } from "../../api/schemas/requests/tasks";
import { GetTaskResponseSchema } from "../../api/schemas/responses/tasks";
import { EventSourceInput } from "@fullcalendar/core";
import { EventInput } from "@fullcalendar/common";

export function TaskViewer() {
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false); // все задачи
    const [tasks, setTasks] = useState<Array<GetTaskResponseSchema>>([]); // все задачи
    const [filteredTasks, setFilteredTasks] = useState<Array<GetTaskResponseSchema>>([]); // задачи для выбранных команд

    const [teams, setTeams] = useState([]); // все команды
    const [showedTeams, setShowedTeams] = useState<Array<number>>([]); // команды, выбранные в фильтре

    const [calendarTasks, setCalendarTasks] = useState<EventSourceInput>([]);
    const [teamToColor] = useState({});

    const calendarRef: React.RefObject<any> = React.createRef();

    function changeShowedTeams(teamId: number) {
        if (showedTeams.includes(teamId)) {
            setShowedTeams(() => showedTeams.filter((tId) => tId !== teamId));
        } else {
            setShowedTeams(() => [...showedTeams, teamId]);
        }
    }

    useEffect(() => {
        API.teams.all().then((allTeams) => {
            setTeams(allTeams);
            // Collect ids of all previews (created and default)
            let teamIds: Array<number> = [];
            // @ts-ignore
            allTeams.forEach((team) => {
                teamIds.push(team.id);
                // @ts-ignore
                teamToColor[team.id.toString()] = team.color;
            });
            setShowedTeams(teamIds);

            const filterTasksParams: FilterTasksParamsSchema = {
                teams: teamIds,
                all: true,
            };

            API.tasks.getTasks(filterTasksParams).then((tasks: Array<GetTaskResponseSchema>) => {
                setTasks(tasks);
                setFilteredTasks(() => tasks);
                setIsLoaded(true);
            });
        });
    }, [teamToColor]);

    useEffect(() => {
        setFilteredTasks(
            tasks.filter((task) => showedTeams.includes(task.team.id) || task.team.name === null)
        );
    }, [showedTeams, tasks]);

    useEffect(() => {
        // WARNING: do not merge code in one line: `React.createRef().current.getApi();` !
        // calendarRef is bounded to FullCalendar component after rendering!
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const calendarApi: CalendarApi = calendarRef.current.getApi();

        // set on resize handler
        let wrapper: Element | null = document.querySelector("#full-calendar-wrapper");
        if (wrapper) {
            // @ts-ignore
            let lastWidth = wrapper.offsetWidth;
            const onChangeWidthCalendarWrapper = () => {
                // @ts-ignore
                let currentWidth = wrapper.offsetWidth;
                if (lastWidth !== currentWidth) {
                    lastWidth = currentWidth;
                    calendarApi.updateSize();
                }
            };
            setInterval(onChangeWidthCalendarWrapper, 100);
        }

        fetchTaskData();
    }, [filteredTasks]);

    function fetchTaskData() {
        if (!filteredTasks || !filteredTasks.length) {
            setCalendarTasks([]);
            return;
        }

        let calTasks: EventSourceInput = [];
        for (let task of filteredTasks) {
            let eventTask: EventInput = {};

            eventTask.title = task.name;
            eventTask.id = task.id.toString();
            eventTask.groupId = task.team.id.toString();
            eventTask.textColor = task.team.name ? "white" : "black";

            eventTask.start = new Date(task.expirationTime);
            eventTask.end = new Date(task.expirationTime);
            eventTask.className = "calendarEvent";

            // @ts-ignore
            const TeamPublicColor = teamToColor[task.team.id.toString()];
            eventTask.color = TeamPublicColor ? TeamPublicColor : "white";

            eventTask.backgroundColor = task.team.name ? eventTask.color : "#eef1ff";
            eventTask.borderColor = eventTask.color;
            eventTask.extendedProps = {
                description: task.description,
                groupName: task.team.name,
                closed: task.closed,
            };
            calTasks.push(eventTask);
        }
        setCalendarTasks(() => calTasks);
    }

    function onTaskClick(event: EventClickArg) {
        const task = event.event._def;
        const taskId = task.publicId;
        navigate(`${taskId.toString()}`);
    }

    const onDateClick = (event: DateClickArg) => {
        const chosenDate = getNextDayDate(event.date);
        navigate(`new/${chosenDate.toJSON()}`);
    };

    return (
        <>
            <LoaderScreen loaded={isLoaded} />
            <div id="full-calendar-wrapper" className="d-flex">
                <FilterColumn teams={teams} onChangeShowedTeams={changeShowedTeams} />
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                    allDaySlot={false}
                    buttonText={{
                        today: "Сегодня",
                        month: "Месяц",
                        week: "Неделя",
                        day: "День",
                        list: "Списком",
                    }}
                    contentHeight="auto"
                    dateClick={onDateClick}
                    views={{
                        dayGridMonth: {},
                        timeGridWeek: {},
                        timeGridDay: {},
                    }}
                    // display="block"
                    eventDisplay="block"
                    editable={true}
                    events={calendarTasks}
                    eventColor="#010023"
                    eventTimeFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        meridiem: false,
                        hour12: false,
                    }}
                    eventClick={onTaskClick}
                    firstDay={1}
                    headerToolbar={{
                        left: "dayGridMonth timeGridWeek timeGridDay",
                        center: "title",
                        right: "list today prev,next",
                    }}
                    height="auto"
                    initialView="dayGridMonth" // available: 'dayGridWeek', 'timeGridDay', 'listWeek'
                    locale="ru"
                    stickyHeaderDates={true}
                    titleFormat={{ year: "numeric", month: "long", day: "numeric" }}
                />
                <Outlet />
            </div>
        </>
    );
}