/* eslint-disable react-hooks/exhaustive-deps */
import { Box, SxProps, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { weekCount } from "../../../utils/dateutils";
import { PickersDay, PickersDayProps, StaticDatePicker } from "@mui/x-date-pickers";

import "dayjs/locale/ru";
import { maxDate, minDate } from "./DesktopCalendar";
import { TodayList } from "../TodayTaskList";
import { UtilSection } from "./common";
import calendarStore from "../../../store/CalendarStore";
import { observer } from "mobx-react-lite";
import taskStore from "../../../store/TaskStore";
import eventStore from "../../../store/EventStore";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { compareTasks } from "../../../utils/taskUtils";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { compareEvent } from "../../../utils/eventUtils";

const MaxDateSize = 140; // максимальный размер отображаемого на мобильном календаре дня

const mobileDaySx: SxProps = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    aspectRatio: "1",
    lineHeight: "1rem",
    width: { xs: "1.2em", sm: "1.5em", md: "2em" },
};

export interface CalendarProps {
    currentMonth: number;
    setCurrentMonth: (value: number) => void;
    currentYear: number;
    setCurrentYear: (value: number) => void;
}

interface MobileCalendarProps extends CalendarProps {}

function MobileCalendar(props: MobileCalendarProps) {
    const theme = useTheme();

    // размер ячейки календаря
    const [dateSize, setDateSize] = useState<number>(44);

    // Для перерисовки задач и событий на календаре после их изменения
    useEffect(() => {}, [eventStore.events, taskStore.tasks]);

    useEffect(() => {
        const onWindowResize = () => {
            const newDs = window.innerWidth / 7 - 5;
            setDateSize(Math.min(newDs, MaxDateSize));
        };
        onWindowResize();
        window.addEventListener("resize", onWindowResize);

        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, []);

    function MobileCustomDayRenderer(
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
            <Box key={today.toJSON()}>
                <PickersDay {...pickersDayProps}>
                    <Box
                        sx={{
                            width: "100%",
                            p: 0,
                            pb: "2px",
                        }}
                    >
                        {dayNumber}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                                lineHeight: "1rem",
                                px: 1,
                            }}
                        >
                            {todayTasks.length !== 0 && (
                                <Box
                                    sx={{
                                        ...mobileDaySx,
                                        background: theme.palette.primary.main,
                                        color: theme.palette.getContrastText(theme.palette.primary.main),
                                    }}
                                >
                                    {todayTasks.length}0
                                </Box>
                            )}
                            {todayEvents.length !== 0 && (
                                <Box
                                    sx={{
                                        ...mobileDaySx,
                                        background: theme.palette.secondary.main,
                                        color: theme.palette.getContrastText(theme.palette.secondary.main),
                                    }}
                                >
                                    {todayEvents.length}0
                                </Box>
                            )}
                        </Box>
                    </Box>
                </PickersDay>
            </Box>
        );
    }

    return (
        <>
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
                        width: "100%",
                        "& div": {
                            maxHeight: 5800,
                            maxWidth: "100%",
                        },
                        "& .MuiCalendarOrClockPicker-root > div": {
                            width: "100%",
                        },

                        "& .MuiCalendarPicker-root": {
                            width: "100%",
                        },

                        "& > div": {
                            minWidth: 256,
                        },
                        "& > div > div, & > div > div > div, & .MuiCalendarPicker-root": {
                            // minWidth: 256,
                        },
                        "& .MuiTypography-caption": {
                            width: dateSize,
                            margin: 0,
                        },
                        "& .PrivatePickersSlideTransition-root, & .MuiDayPicker-monthContainer": {
                            minHeight: dateSize * weekCount(props.currentYear, props.currentMonth),
                        },
                        '& .PrivatePickersSlideTransition-root [role="row"]': {
                            margin: 0,
                        },
                        "& .MuiPickersDay-dayWithMargin": {
                            margin: 0,
                            aspectRatio: "1/1",
                            height: "100%",
                            width: "100%",
                        },
                        "& .MuiPickersDay-root": {
                            width: dateSize,
                            height: dateSize,
                            fontSize: "1rem",

                            // minHeight: `${BaseDateHeight}px`,
                            border: "1px solid",
                            borderColor: theme.palette.grey.A400,
                            borderRadius: 0,
                            alignItems: "flex-start",
                            background: "white",
                            color: theme.palette.getContrastText("#ffffff"),
                        },

                        "&: .MuiDialogActions-spacing": { px: 0 },
                    }}
                >
                    <UtilSection />
                    <StaticDatePicker
                        minDate={minDate}
                        maxDate={maxDate}
                        className="w-100"
                        showDaysOutsideCurrentMonth
                        // minDate={new Date("2000-01-01")}
                        displayStaticWrapperAs="desktop"
                        openTo="day"
                        value={calendarStore.chosenDate}
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
                        renderDay={MobileCustomDayRenderer}
                        componentsProps={{
                            actionBar: {
                                actions: ["today"],
                            },
                        }}
                    />
                </Box>
                <TodayList />
            </LocalizationProvider>
        </>
    );
}

export default observer(MobileCalendar);
