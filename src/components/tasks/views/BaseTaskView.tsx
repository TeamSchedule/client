import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import FullTaskView from "./FullTaskView";
import { TaskActionsProps, TaskViewProps } from "./interfaces";
import TaskPreview from "./TaskPreview";

export interface BaseTaskViewProps extends TaskViewProps, TaskActionsProps {
    fullMode?: boolean;
}

export default function BaseTaskView(props: BaseTaskViewProps) {
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
                    <>{props.fullMode ? <FullTaskView {...props} /> : <TaskPreview {...props} />}</>
                </CardContent>
            </Card>
        </>
    );
}
