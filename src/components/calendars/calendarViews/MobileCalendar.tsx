/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, BadgeProps, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { isEqualYearMonthDate, weekCount } from "../../../utils/dateutils";
import { PickersDay, PickersDayProps, StaticDatePicker } from "@mui/x-date-pickers";

import "dayjs/locale/ru";
import { styled } from "@mui/material/styles";
import { maxDate, minDate } from "./DesktopCalendar";
import { TodayList } from "../TodayTaskList";
import { UtilSection } from "./common";
import calendarStore from "../../../store/CalendarStore";
import { observer } from "mobx-react-lite";
import taskStore from "../../../store/TaskStore";
import eventStore from "../../../store/EventStore";

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

export interface CalendarProps {
    currentMonth: number;
    setCurrentMonth: (value: number) => void;
    currentYear: number;
    setCurrentYear: (value: number) => void;
}

interface MobileCalendarProps extends CalendarProps {}

function MobileCalendar(props: MobileCalendarProps) {
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
        return (
            // @ts-ignore
            <Box key={date}>
                <MobileCalendarDayBadge
                    badgeContent={
                        taskStore.tasks.filter((task) => {
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
                        },
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
