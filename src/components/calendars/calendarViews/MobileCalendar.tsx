/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, BadgeProps, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FetchingMonthRange } from "../../../api/utils/buildFilterParams";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { isEqualYearMonthDate, weekCount } from "../../../utils/dateutils";
import { PickersDay, PickersDayProps, StaticDatePicker } from "@mui/x-date-pickers";

import "dayjs/locale/ru";
import { AdaptiveCalendarProps } from "./AdaptiveCalendar";
import { styled } from "@mui/material/styles";
import { maxDate, minDate } from "./DesktopCalendar";
import { TodayTaskList } from "../TodayTaskList";
import { UtilSection } from "./common";

const MaxDateSize = 80; // максимальный размер отображаемого на мобильном календаре дня

const MobileCalendarDayBadge = styled(Badge)<BadgeProps>(() => ({
    "& .MuiBadge-badge": {
        right: 10,
        top: 8,
        padding: 0,
        fontSize: "0.7rem",
        width: "15px",
        height: "18px",
    },
}));

export interface MobileCalendarProps extends AdaptiveCalendarProps {}

export default function MobileCalendar(props: MobileCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState<number>(props.viewedDate.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState<number>(props.viewedDate.getFullYear());

    // размер ячейки календаря
    const [dateSize, setDateSize] = useState<number>(44);

    useEffect(() => {
        let timerId = setInterval(() => {
            const newDs = window.innerWidth / 7 - 5;
            setDateSize(Math.min(newDs, MaxDateSize));
        }, 1000);

        return () => {
            clearInterval(timerId);
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

    function MobileCustomDayRenderer(
        date: Date,
        selectedDays: Array<Date | null>,
        pickersDayProps: PickersDayProps<Date>
    ) {
        // @ts-ignore
        return (
            // @ts-ignore
            <Box key={date}>
                <MobileCalendarDayBadge
                    badgeContent={
                        props.tasks.filter((task) => {
                            // @ts-ignore
                            return isEqualYearMonthDate(new Date(task.expirationTime), date["$d"]);
                        }).length
                    }
                    color="secondary"
                    /*@ts-ignore*/
                    key={date}
                >
                    {/*@ts-ignore*/}
                    <PickersDay {...pickersDayProps} key={date} />
                </MobileCalendarDayBadge>
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
                            minWidth: 256,
                        },
                        "& .MuiTypography-caption": {
                            width: dateSize,
                            margin: 0,
                        },
                        "& .PrivatePickersSlideTransition-root, & .MuiDayPicker-monthContainer": {
                            minHeight: dateSize * weekCount(currentYear, currentMonth),
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
                        },
                    }}
                >
                    <UtilSection viewedDate={props.viewedDate} setFilterObject={props.setFilterObject} />
                    <StaticDatePicker
                        minDate={minDate}
                        maxDate={maxDate}
                        className="w-100"
                        showDaysOutsideCurrentMonth
                        // minDate={new Date("2000-01-01")}
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
                        renderDay={MobileCustomDayRenderer}
                        componentsProps={{
                            actionBar: {
                                actions: ["today"],
                            },
                        }}
                    />
                </Box>
                <TodayTaskList day={props.chosenDate} tasks={props.tasks} />
            </LocalizationProvider>
        </>
    );
}
