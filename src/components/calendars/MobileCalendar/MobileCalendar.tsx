import { LocalizationProvider, PickersDay, PickersDayProps, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Badge, BadgeProps, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { weekCount } from "../../../utils/dateutils";
import { styled } from "@mui/material/styles";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { FetchingMonthRange } from "../../../api/utils/buildFilterParams";

const MaxDateSize = 80; // максимальный размер отображаемого на мобильном календаре дня

/* https://github.com/mui/material-ui/issues/27700 */

const CalendarDayBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 10,
        top: 8,
        padding: 0,
        fontSize: "0.7rem",
        width: "15px",
        height: "18px",
    },
}));

interface MobileCalendarProps {
    viewedDate: Date;
    setViewedDate: (value: Date) => void;
    chosenDate: Date;
    setChosenDate: (value: Date) => void;
    tasks: TaskResponseItemSchema[];
}

export default function MobileCalendar(props: MobileCalendarProps) {
    const [dateSize, setDateSize] = useState<number>(44);
    const [currentMonth, setCurrentMonth] = useState<number>(props.viewedDate.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState<number>(props.viewedDate.getFullYear());

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

    function CustomDayRenderer(date: Date, selectedDays: Array<Date | null>, pickersDayProps: PickersDayProps<Date>) {
        return (
            <>
                <CalendarDayBadge
                    badgeContent={
                        props.tasks.filter((task) => {
                            // @ts-ignore
                            return new Date(task.expirationTime).getTime() === date["$d"].getTime();
                        }).length
                    }
                    color="secondary"
                >
                    <PickersDay {...pickersDayProps} />
                </CalendarDayBadge>
            </>
        );
    }

    return (
        <div className="d-block d-md-none">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <Box
                    sx={{
                        "& div": {
                            maxHeight: 580,
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
                    <StaticDatePicker
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
                        onYearChange={setCurrentYear}
                        renderInput={(params) => <TextField {...params} />}
                        // @ts-ignore
                        renderDay={CustomDayRenderer}
                        componentsProps={{
                            actionBar: {
                                actions: ["today"],
                            },
                        }}
                    />
                </Box>
            </LocalizationProvider>
        </div>
    );
}
