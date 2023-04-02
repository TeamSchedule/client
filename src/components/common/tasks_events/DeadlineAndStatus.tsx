import React from "react";
import Box from "@mui/material/Box";
import WorkStatusPlate, { WorkStatusPlateProps } from "./WorkStatusPlate";
import DeadlinePlate, { DeadlinePlateProps } from "./DeadlinePlate";
import { TaskStatusEnum } from "../../../enums/tasksEnums";
import { EventStatusEnum } from "../../../enums/eventsEnums";
import { useTheme } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

interface DeadlineAndStatusProps extends WorkStatusPlateProps, DeadlinePlateProps {
    onChangeStatus?: (e: React.MouseEvent) => void;
}

export default function DeadlineAndStatus(props: DeadlineAndStatusProps) {
    const theme = useTheme();

    const isCompleted: boolean =
        props.status === TaskStatusEnum.COMPLETED || props.status === EventStatusEnum.COMPLETED;

    let deadlineTextColor = "inherit";
    if (isCompleted) {
        deadlineTextColor = theme.palette.success.main;
    } else if (!isCompleted && new Date() > new Date(props.endDate)) {
        deadlineTextColor = theme.palette.error.main;
    }

    return (
        <Tooltip title={`Изменить статус выполнения на: "${isCompleted ? "В работе" : "Завершено"}"`}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    px: 1,
                    borderRadius: "3px",
                    "&:hover": {
                        backgroundColor: "#d2d7ff",
                    },
                }}
                onClick={props.onChangeStatus}
            >
                <WorkStatusPlate status={props.status} />
                <DeadlinePlate endDate={props.endDate} color={deadlineTextColor} />
            </Box>
        </Tooltip>
    );
}
