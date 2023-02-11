import React, { useEffect, useState } from "react";
import MobileCalendar from "../MobileCalendar";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import TaskPreview from "../../tasks/TaskPreview/TaskPreview";
import { taskData } from "../../../testdata/data";
import Button, { ButtonProps } from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CreateNewEventPath, CreateNewTaskPath } from "../../../routes/paths";
import Typography from "@mui/material/Typography";
import { API } from "../../../api/api";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import { getDateRepresentation } from "../../../utils/dateutils";

const RightSideButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    "&:hover": {
        backgroundColor: purple[700],
    },
}));

const LeftSideButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
}));

export default function FullCalendarMobileView() {
    const navigate = useNavigate();

    const [viewedDate, setViewedDate] = useState<Date>(new Date()); // дата, в диапазоне которой показываются задачи
    const [chosenDate, setChosenDate] = useState<Date>(new Date()); // выбранный день, для него показываюся задачи на мобильной версии

    return (
        <>
            <div className="d-flex justify-content-center">
                <LeftSideButton
                    fullWidth
                    variant="contained"
                    sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    onClick={(e) => {
                        navigate(CreateNewEventPath);
                    }}
                >
                    Новое событие
                </LeftSideButton>
                <RightSideButton
                    fullWidth
                    variant="contained"
                    onClick={(e) => {
                        navigate(CreateNewTaskPath);
                    }}
                >
                    Новая задача
                </RightSideButton>
            </div>
            <MobileCalendar
                viewedDate={viewedDate}
                setViewedDate={setViewedDate}
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
            />
            <DayTaskList day={viewedDate} />
        </>
    );
}

const FetchingMonthRange: number = 2;

interface DayTaskListProps {
    day: Date;
}

function DayTaskList(props: DayTaskListProps) {
    const [tasks, setTasks] = useState<TaskResponseItemSchema[]>([taskData, taskData]);

    useEffect(() => {
        const params: FilterTasksParamsSchema = {
            from: new Date(props.day.getFullYear(), props.day.getMonth() - FetchingMonthRange, 1),
            to: new Date(props.day.getFullYear(), props.day.getMonth() + FetchingMonthRange),
            teams: [],
        };

        API.tasks
            .getTasks(params)
            .then((tasks: TaskResponseItemSchema[]) => {
                setTasks(tasks);
            })
            .catch(() => {})
            .finally(() => {});
    }, [props.day]);

    const todayDateStr: string = props.day ? getDateRepresentation(props.day) : "";

    if (tasks.length === 0) {
        return (
            <>
                <div>
                    <p>На&nbsp;{todayDateStr}&nbsp;задач нет</p>
                </div>
            </>
        );
    }

    return (
        <>
            <div>
                <Typography variant="subtitle1" component="p" className="text-center">
                    Задачи на {todayDateStr}
                </Typography>

                {tasks.map((task) => (
                    <div className="mb-2">
                        <TaskPreview key={task.id} task={task} />
                    </div>
                ))}
            </div>
        </>
    );
}
