/* eslint-disable react-hooks/exhaustive-deps */
import { Box, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { weekCount } from "../../../utils/dateutils";
import { PickersDay, PickersDayProps, StaticDatePicker } from "@mui/x-date-pickers";
import Paper from "@mui/material/Paper";

import "dayjs/locale/ru";
import { TodayList } from "../TodayTaskList";
import { UtilSection } from "./common";
import { compareTasks } from "../../../utils/taskUtils";
import DesktopCalendarTaskItem from "../../tasks/views/DesktopCalendarTaskItem";
import { observer } from "mobx-react-lite";
import calendarStore from "../../../store/CalendarStore";
import { CalendarElemTypeEnum } from "../../../enums/common";
import eventStore from "../../../store/EventStore";
import taskStore from "../../../store/TaskStore";
import { CalendarProps } from "./MobileCalendar";
import { compareEvent } from "../../../utils/eventUtils";
import DesktopCalendarEventPreview from "../../events/views/DesktopCalendarEventPreview";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";

const MaxDateSize = 400; // максимальный размер отображаемого на десктопном календаре дня
const BaseDateHeight = 120; // базовая высота ячейки
export const minDate = new Date("2010-01-01");
export const maxDate = new Date("2050-01-01");

interface DesktopCalendarProps extends CalendarProps {}

function DesktopCalendar(props: DesktopCalendarProps) {
    const theme = useTheme();
    // размер ячейки календаря
    const [dateSize, setDateSize] = useState<number>((window.innerWidth - 300) / 7 - 5);

    // Для перерисовки задач и событий на календаре после их изменения
    useEffect(() => {}, [eventStore.events, taskStore.tasks]);

    useEffect(() => {
        const onWindowResize = () => {
            const newDs = (window.innerWidth - 300) / 7 - 5;
            setDateSize(Math.min(newDs, MaxDateSize));
        };
        onWindowResize();
        window.addEventListener("resize", onWindowResize);

        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, []);

    function DesktopCustomDayRenderer(
        date: Date,
        selectedDays: Array<Date | null>,
        pickersDayProps: PickersDayProps<Date>
    ) {
        // @ts-ignore
        const dayNumber: number = date["$D"];
        // @ts-ignore
        const today: Date = new Date(date["$d"]);

        const todayTasks: TaskResponseItemSchema[] = taskStore.getDayTasks(today).sort(compareTasks);

        const todayEvents: EventResponseItemSchema[] = eventStore
            .getDayEvents(today)
            .filter((event) =>
                !calendarStore.getFilters.status ? true : calendarStore.getFilters.status === event.status
            )
            .sort(compareEvent);

        return (
            <Box sx={{ minHeight: dayNumber === new Date().getDate() ? "100px" : 0 }}>
                <PickersDay {...pickersDayProps}>
                    <Box
                        sx={{
                            width: "100%",
                            px: "3px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "stretch",
                            alignItems: "stretch",
                        }}
                    >
                        {dayNumber}

                        {calendarStore.filters.type !== CalendarElemTypeEnum.TASK &&
                            todayEvents.map((event) => <DesktopCalendarEventPreview key={event.id} event={event} />)}
                        {calendarStore.filters.type !== CalendarElemTypeEnum.EVENT &&
                            todayTasks.map((task) => <DesktopCalendarTaskItem key={task.id} task={task} />)}
                    </Box>
                </PickersDay>
            </Box>
        );
    }

    // @ts-ignore
    return (
        <Box sx={{ display: "flex", alignItems: "stretch" }}>
            <Box sx={{ border: "0px solid black", flexGrow: 1 }}>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ru"
                    localeText={{
                        todayButtonLabel: "Сегодня",
                        previousMonth: "Предыдущий месяц",
                        nextMonth: "Следующий месяц",
                    }}
                >
                    <Box
                        sx={{
                            "& .MuiDayPicker-weekDayLabel": {
                                fontSize: "1rem",
                            },
                            "& .MuiDayPicker-weekDayLabel:nth-child(1)::after": {
                                content: `"н"`,
                                display: "inline",
                            },
                            "& .MuiDayPicker-weekDayLabel:nth-child(2)::after": {
                                content: `"т"`,
                                display: "inline",
                            },
                            "& .MuiDayPicker-weekDayLabel:nth-child(3)::after": {
                                content: `"р"`,
                                display: "inline",
                            },
                            "& .MuiDayPicker-weekDayLabel:nth-child(4)::after": {
                                content: `"т"`,
                                display: "inline",
                            },
                            "& .MuiDayPicker-weekDayLabel:nth-child(5)::after": {
                                content: `"т"`,
                                display: "inline",
                            },
                            "& .MuiDayPicker-weekDayLabel:nth-child(6)::after": {
                                content: `"б"`,
                                display: "inline",
                            },
                            "& .MuiDayPicker-weekDayLabel:nth-child(7)::after": {
                                content: `"с"`,
                                display: "inline",
                            },
                            "& .MuiPickersCalendarHeader-root": {
                                m: 0,
                            },
                            "& div": {
                                maxHeight: 2000,
                            },
                            "& .MuiCalendarOrClockPicker-root > div": {
                                width: "100%",
                            },

                            "& .MuiCalendarPicker-root": {
                                width: "100%",
                            },
                            "& .MuiTypography-caption": {
                                width: dateSize,
                                margin: 0,
                            },
                            "& .PrivatePickersSlideTransition-root, & .MuiDayPicker-monthContainer": {
                                minHeight: BaseDateHeight * weekCount(props.currentYear, props.currentMonth),
                            },
                            '& .PrivatePickersSlideTransition-root [role="row"]': {
                                margin: 0,
                            },
                            "& .MuiPickersDay-dayWithMargin": {
                                margin: 0,
                                height: "100%",
                            },
                            "& .MuiPickersDay-root": {
                                width: dateSize,
                                minHeight: `${BaseDateHeight}px`,
                                height: "100%",
                                fontSize: "0.85rem",
                                border: "1px solid",
                                borderColor: theme.palette.primary.light,
                                borderRadius: 0,
                                alignItems: "flex-start",
                                background: "white",
                                color: theme.palette.getContrastText("#ffffff"),
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#c8d5ff",
                                color: theme.palette.getContrastText(theme.palette.primary.light),
                            },
                            "& .Mui-selected:hover": {
                                backgroundColor: "#8ea8ff",
                            },
                        }}
                    >
                        <StaticDatePicker
                            minDate={minDate}
                            maxDate={maxDate}
                            className="w-100"
                            showDaysOutsideCurrentMonth
                            displayStaticWrapperAs="desktop"
                            openTo="day"
                            value={calendarStore.getChosenDate}
                            onChange={(v) => {
                                // @ts-ignore
                                calendarStore.setChosenDate(v["$d"]);
                            }}
                            onMonthChange={(month) => {
                                // @ts-ignore
                                props.setCurrentMonth(month["$M"]);
                            }}
                            // @ts-ignore
                            onYearChange={props.setCurrentYear}
                            renderInput={(params) => <TextField {...params} />}
                            // @ts-ignore
                            renderDay={DesktopCustomDayRenderer}
                            componentsProps={{
                                actionBar: {
                                    actions: ["today"],
                                },
                            }}
                        />
                    </Box>
                </LocalizationProvider>
            </Box>

            <Box sx={{ width: "300px" }}>
                <Paper elevation={0} sx={{ px: 2, width: "100%" }}>
                    <UtilSection />
                    <TodayList />
                </Paper>
            </Box>
        </Box>
    );
}

export default observer(DesktopCalendar);
