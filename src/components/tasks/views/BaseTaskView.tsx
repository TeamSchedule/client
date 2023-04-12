import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import FullTaskView from "./FullTaskView";
import { TaskActionsProps, TaskViewProps } from "./interfaces";
import TaskPreview from "./TaskPreview";
import { TaskViewModeEnum, TaskViewModeStrings } from "../../../enums/tasksEnums";
import DesktopCalendarTaskItem from "./DesktopCalendarTaskItem";

export interface BaseTaskViewProps extends TaskViewProps, TaskActionsProps {
    viewMode?: TaskViewModeStrings;
}

export default function BaseTaskView(props: BaseTaskViewProps) {
    if (props.viewMode === TaskViewModeEnum.CALENDAR) {
        return <DesktopCalendarTaskItem {...props} />;
    }
    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    minWidth: "275px",
                    "& .MuiCardContent-root": {
                        paddingBottom: "8px !important",
                    },
                }}
            >
                <CardContent sx={{ p: 1 }}>
                    {!props.viewMode || (props.viewMode === TaskViewModeEnum.PREVIEW && <TaskPreview {...props} />)}
                    {props.viewMode === TaskViewModeEnum.FULL && <FullTaskView {...props} />}
                </CardContent>
            </Card>
        </>
    );
}
