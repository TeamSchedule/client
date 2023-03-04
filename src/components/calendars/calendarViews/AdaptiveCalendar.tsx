import MainCalendar from "./MainCalendar";
import React from "react";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { isEqualYearMonthDate } from "../../../utils/dateutils";
import { Badge, BadgeProps, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";

/* https://github.com/mui/material-ui/issues/27700 */

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

export interface AdaptiveCalendarProps {
    viewedDate: Date;
    setViewedDate: (value: Date) => void;
    chosenDate: Date;
    setChosenDate: (value: Date) => void;
    tasks: TaskResponseItemSchema[];
}

export default function AdaptiveCalendar(props: AdaptiveCalendarProps) {
    function MobileCustomDayRenderer(
        date: Date,
        selectedDays: Array<Date | null>,
        pickersDayProps: PickersDayProps<Date>
    ) {
        return (
            <>
                <MobileCalendarDayBadge
                    badgeContent={
                        props.tasks.filter((task) => {
                            // @ts-ignore
                            return isEqualYearMonthDate(new Date(task.expirationTime), date["$d"]);
                        }).length
                    }
                    color="secondary"
                    key={date.toJSON()}
                >
                    <PickersDay {...pickersDayProps} />
                </MobileCalendarDayBadge>
            </>
        );
    }

    return (
        <>
            <Box
                sx={{
                    display: {
                        xs: "block",
                        md: "none",
                    },
                }}
            >
                <MainCalendar {...props} customDayRenderer={MobileCustomDayRenderer} />
            </Box>
            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "block",
                        width: "80%",
                    },
                    border: "1px solid black",
                }}
            >
                <MainCalendar {...props} customDayRenderer={MobileCustomDayRenderer} />
            </Box>
        </>
    );
}
