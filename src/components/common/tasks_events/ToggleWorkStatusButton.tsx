import { TaskStatusEnum, TaskStatusStrings } from "../../../enums/tasksEnums";
import React from "react";
import { EventStatusEnum, EventStatusStrings } from "../../../enums/eventsEnums";
import LoadingButton from "@mui/lab/LoadingButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DoneIcon from "@mui/icons-material/Done";

interface ToggleWorkStatusButtonProps {
    status: EventStatusStrings | TaskStatusStrings;
    toggleStatus: (val: boolean) => (e: React.MouseEvent) => void;
    loading?: boolean;
}

export default function ToggleWorkStatusButton(props: ToggleWorkStatusButtonProps) {
    return (
        <>
            {(props.status === EventStatusEnum.COMPLETED || props.status === TaskStatusEnum.COMPLETED) && (
                <LoadingButton
                    loading={props.loading}
                    fullWidth
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    onClick={props.toggleStatus(true)}
                    sx={{ mt: 2 }}
                >
                    Запустить
                </LoadingButton>
            )}

            {(props.status === EventStatusEnum.IN_PROGRESS || props.status === TaskStatusEnum.IN_PROGRESS) && (
                <LoadingButton
                    loading={props.loading}
                    fullWidth
                    variant="contained"
                    startIcon={<DoneIcon />}
                    onClick={props.toggleStatus(false)}
                    sx={{ mt: 2 }}
                >
                    Выполнить
                </LoadingButton>
            )}
        </>
    );
}
