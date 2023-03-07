import React, { useRef } from "react";
import { Box } from "@mui/material";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import MobileCalendar from "./MobileCalendar";
import DesktopCalendar from "./DesktopCalendar";

export interface AdaptiveCalendarProps {
    viewedDate: Date;
    setViewedDate: (value: Date) => void;
    chosenDate: Date;
    setChosenDate: (value: Date) => void;
    tasks: TaskResponseItemSchema[];
    setDisplayedTasks: (tasks: TaskResponseItemSchema[]) => void;
}

export default function AdaptiveCalendar(props: AdaptiveCalendarProps) {
    const desktopRef = useRef(null);

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
                ref={desktopRef}
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
