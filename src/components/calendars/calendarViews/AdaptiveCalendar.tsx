import React from "react";
import { Box } from "@mui/material";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import MobileCalendar from "./MobileCalendar";
import DesktopCalendar from "./DesktopCalendar";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";

export interface AdaptiveCalendarProps {
    viewedDate: Date;
    setViewedDate: (value: Date) => void;
    chosenDate: Date;
    setChosenDate: (value: Date) => void;
    tasks: TaskResponseItemSchema[];
    setTasks: (tasks: TaskResponseItemSchema[]) => void;
    setFilterObject: (params: FilterTasksParamsSchema) => void;
}

export default function AdaptiveCalendar(props: AdaptiveCalendarProps) {
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
                <MobileCalendar {...props} />
            </Box>
            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "block",
                        position: "relative",
                        minWidth: "320px",
                    },
                }}
            >
                <DesktopCalendar {...props} />
            </Box>
        </>
    );
}
