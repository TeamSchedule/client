/* eslint-disable react-hooks/exhaustive-deps */
import { Box, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FetchingMonthRange } from "../../../api/utils/buildFilterParams";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { isEqualYearMonthDate, weekCount } from "../../../utils/dateutils";
import { PickersDay, PickersDayProps, StaticDatePicker } from "@mui/x-date-pickers";
import Paper from "@mui/material/Paper";

import "dayjs/locale/ru";
import { AdaptiveCalendarProps } from "./AdaptiveCalendar";
import DesktopCalendarTaskPreview from "../../tasks/DesktopCalendarTaskPreview/DesktopCalendarTaskPreview";
import { TodayList } from "../TodayTaskList";
import { UtilSection } from "./common";
import { compareTasks } from "../../../utils/taskUtils";
import DesktopCalendarEventPreview from "../../events/DesktopCalendarEventPreview/DesktopCalendarEventPreview";
import { compareEvent } from "../../../utils/eventUtils";

const MaxDateSize = 400; // максимальный размер отображаемого на десктопном календаре дня
const BaseDateHeight = 120; // базовая высота ячейки
export const minDate = new Date("2010-01-01");
export const maxDate = new Date("2050-01-01");

export interface DesktopCalendarProps extends AdaptiveCalendarProps {}

export default function DesktopCalendar(props: DesktopCalendarProps) {
    const theme = useTheme();

    const [currentMonth, setCurrentMonth] = useState<number>(props.viewedDate.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState<number>(props.viewedDate.getFullYear());

    // размер ячейки календаря
    const [dateSize, setDateSize] = useState<number>((window.innerWidth - 300) / 7 - 5);

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

    useEffect(() => {
        // Так как задачи запрашиваются в диапазоне нескольких месяцев от текущего, изменять дату, только если она вышла из диапазона

        const minViewedDate: Date = new Date(
            props.viewedDate.getFullYear(),
            props.viewedDate.getMonth() - FetchingMonthRange
        );
        const maxViewedDate: Date = new Date(
            props.viewedDate.getFullYear(),
            props.viewedDate.getMonth() + FetchingMonthRange
        );

        const newViewedDate: Date = new Date(currentYear, currentMonth);

        if (newViewedDate > maxViewedDate || newViewedDate < minViewedDate) {
            // вышли из диапазона, надо обновить дату и запросить задачи еще раз
            props.setViewedDate(new Date(currentYear, currentMonth));
        }
    }, [currentMonth, currentYear]);

    function DesktopCustomDayRenderer(
        date: Date,
        selectedDays: Array<Date | null>,
        pickersDayProps: PickersDayProps<Date>
    ) {
        // @ts-ignore
        const dayNumber: number = date["$D"];
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
                        {props.events
                            .filter((event) => {
                                // @ts-ignore
                                return isEqualYearMonthDate(new Date(event.endDate), date["$d"]);
                            })
                            .sort(compareEvent)
                            .map((event) => (
                                <DesktopCalendarEventPreview key={event.id} event={event} />
                            ))}
                        {props.tasks
                            .filter((task) => {
                                // @ts-ignore
                                return isEqualYearMonthDate(new Date(task.expirationTime), date["$d"]);
                            })
                            .sort(compareTasks)
                            .map((task) => (
                                <DesktopCalendarTaskPreview key={task.id} task={task} />
                            ))}
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
                                minHeight: BaseDateHeight * weekCount(currentYear, currentMonth),
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
                            value={props.chosenDate}
                            onChange={(v) => {
                                // @ts-ignore
                                props.setChosenDate(v["$d"]);
                            }}
                            onMonthChange={(month) => {
                                // @ts-ignore
                                setCurrentMonth(month["$M"]);
                            }}
                            // @ts-ignore
                            onYearChange={setCurrentYear}
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
                    <UtilSection viewedDate={props.viewedDate} setFilterObject={props.setFilterObject} />
                    <TodayList day={props.chosenDate} tasks={props.tasks} events={props.events} />
                </Paper>
            </Box>
        </Box>
    );
}
