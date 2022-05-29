import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Outlet} from "react-router-dom";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import {formDateFromArray} from "../../../../utils/time";

import {API} from "../../../../api/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./monthCalendar.css";


export function TaskViewer() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const [calendarTasks, setCalendarTasks] = useState([]);

    const calendarRef = React.createRef();
    let calendarApi = null;

    useEffect(() => {
        API.teams.all().then(allTeams => {
            let teams = allTeams["teams"].map(t => t.id);
            teams.push(allTeams.defaultTeamId);
            API.tasks.getTasks({
                "from": (new Date("2020-01-01")).toJSON(),
                "to": (new Date("2023-01-01")).toJSON(),
                "teams": allTeams["teams"].map(t => t.id).join(",")
            }).then(tasks => {
                setTasks(tasks);
            });
        });
    }, []);

    useEffect(() => {
        // WARNING: do not merge code in one line: `React.createRef().current.getApi();` !
        // calendarRef is bounded to FullCalendar component after rendering!
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
    }, [tasks]);

    function fetchTaskData() {
        if (!tasks || !tasks.length) return;
        let calTasks = [];
        for (let task of tasks) {
            calTasks.push({
                title: task.name,
                id: task.id,
                groupId: task.teamId,

                start: formDateFromArray(task.expirationTime),  // TODO: refactor this bullshit
                end: formDateFromArray(task.expirationTime),  // TODO: refactor this bullshit

                extendedProps: {
                    description: task.description,
                    groupName: task.team.name,
                    closed: task.closed,
                },
                // eventColor: "#0f0",
                className: "monthEvent",
                eventDisplay: "block",

                backgroundColor: task.closed ? "#006e00" : "#010023",
                // borderColor: "",
                // textColor: "",
            });
        }
        setCalendarTasks(calTasks);
    }

    const onTaskClick = (e) => {
        const task = e.event._def;
        const taskId = task.publicId;
        navigate(`../${taskId.toString()}`);
    }

    const onDateClick = (conf) => {
        navigate(`new/${conf.date.toJSON()}`);
    }

    return (
        <div id="full-calendar-wrapper">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}

                allDaySlot={false}
                buttonText={
                    {
                        today: 'Сегодня',
                        month: 'Месяц',
                        week: 'Неделя',
                        day: 'День',
                        list: 'Списком'
                    }
                }
                contentHeight="auto"
                dateClick={onDateClick}
                views={
                    {
                        dayGridMonth: {},
                        timeGridWeek: {},
                        timeGridDay: {},
                    }
                }
                display="block"

                editable={true}
                events={calendarTasks}
                eventColor="#010023"
                eventTimeFormat={
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                        meridiem: false,
                        hour12: false
                    }
                }
                eventClick={onTaskClick}
                firstDay={1}
                headerToolbar={
                    {
                        left: 'dayGridMonth timeGridWeek timeGridDay',
                        center: 'title',
                        right: 'list today prev,next',
                    }
                }
                height="auto"

                // available: 'dayGridWeek', 'timeGridDay', 'listWeek'
                initialView="dayGridMonth"
                locale="ru"
                stickyHeaderDates={true}

                timeZone="Asia/Krasnoyarsk"
                titleFormat={
                    {year: 'numeric', month: 'long', day: 'numeric'}
                }
            />
            <Outlet/>
        </div>
    );
}
