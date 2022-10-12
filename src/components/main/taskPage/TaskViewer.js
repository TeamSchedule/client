import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Outlet } from "react-router-dom";
import { getNextDayDate } from "../../../utils/getPrevDayDate";
import FilterColumn from "./FilterColumn";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import interactionPlugin from "@fullcalendar/interaction";
import { API } from "../../../api/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./monthCalendar.css";

export function TaskViewer() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]); // все задачи
    const [filteredTasks, setFilteredTasks] = useState([]); // задачи для выбранных команд

    const [teams, setTeams] = useState([]); // все команды
    const [showedTeams, setShowedTeams] = useState([]); // команды, выбранные в фильтре

    const [calendarTasks, setCalendarTasks] = useState([]);
    const [teamToColor] = useState({});

    const calendarRef = React.createRef();

    let calendarApi = null;

    function changeShowedTeams(teamId) {
        if (showedTeams.includes(teamId)) {
            setShowedTeams(() => showedTeams.filter((tId) => tId !== teamId));
        } else {
            setShowedTeams(() => [...showedTeams, teamId]);
        }
    }

    useEffect(() => {
        API.teams.all().then((allTeams) => {
            setTeams(allTeams["teams"]);
            // Collect ids of all teams (created and default)
            let teamIds = [];
            allTeams["teams"].forEach((team) => {
                teamIds.push(team.id);
                teamToColor[team.id.toString()] = team.color;
            });
            setShowedTeams(teamIds);

            API.tasks
                .getTasks({
                    from: new Date("2020-01-01").toJSON(),
                    to: new Date("2023-01-01").toJSON(),
                    teams: teamIds.join(","),
                })
                .then((tasks) => {
                    setTasks(tasks);
                    setFilteredTasks(() => tasks);
                });
        });
    }, [teamToColor]);

    useEffect(() => {
        setFilteredTasks(tasks.filter((task) => showedTeams.includes(task.team.id)));
    }, [showedTeams, tasks]);

    useEffect(() => {
        // WARNING: do not merge code in one line: `React.createRef().current.getApi();` !
        // calendarRef is bounded to FullCalendar component after rendering!
        // eslint-disable-next-line react-hooks/exhaustive-deps
        calendarApi = calendarRef.current.getApi();

        // set on resize handler
        let wrapper = document.querySelector("#full-calendar-wrapper");
        let lastWidth = wrapper.offsetWidth;
        const onChangeWidthCalendarWrapper = function () {
            let currentWidth = wrapper.offsetWidth;
            if (lastWidth !== currentWidth) {
                lastWidth = currentWidth;
                calendarApi.updateSize();
            }
        };
        setInterval(onChangeWidthCalendarWrapper, 100);

        fetchTaskData();
    }, [filteredTasks]);

    function fetchTaskData() {
        if (!filteredTasks || !filteredTasks.length) {
            setCalendarTasks([]);
            return;
        }
        let calTasks = [];
        for (let task of filteredTasks) {
            const expDtTask = new Date(task.expirationTime);
            const TeamPublicColor = teamToColor[task.team.id.toString()];
            task.color = TeamPublicColor ? TeamPublicColor : "white";

            calTasks.push({
                title: task.name,
                id: task.id,
                groupId: task.teamId,

                start: expDtTask,
                end: expDtTask,

                extendedProps: {
                    description: task.description,
                    groupName: task.team.name,
                    closed: task.closed,
                },
                textColor: task.team.name ? "white" : "black",
                backgroundColor: task.team.name ? task.color : "#eef1ff",
                borderColor: task.color,
                className: "calendarEvent",
            });
        }
        setCalendarTasks(() => calTasks);
    }

    function onTaskClick(e) {
        const task = e.event._def;
        const taskId = task.publicId;
        navigate(`${taskId.toString()}`);
    }

    const onDateClick = (conf) => {
        const chosenDate = getNextDayDate(conf.date);
        navigate(`new/${chosenDate.toJSON()}`);
    };

    return (
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
                display="block"
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
    );
}
