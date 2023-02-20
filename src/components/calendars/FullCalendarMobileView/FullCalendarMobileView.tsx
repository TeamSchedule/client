import React, { useEffect, useState } from "react";
import MobileCalendar from "../MobileCalendar";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import TaskPreview from "../../tasks/TaskPreview";
import { taskData, unitsData } from "../../../testdata/data";
import Button, { ButtonProps } from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CreateNewEventPath, CreateNewTaskPath } from "../../../routes/paths";
import Typography from "@mui/material/Typography";
import { API } from "../../../api/api";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import { getDateRepresentation, isEqualYearMonthDate } from "../../../utils/dateutils";
import FilterUnit from "../../filters/FilterUnit";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import FilterEvent from "../../filters/FilterEvent";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import FilterUser from "../../filters/FilterUser";
import { UserSchema } from "../../../api/schemas/responses/users";
import buildFilterParams from "../../../api/utils/buildFilterParams";
import styles from "../CalendarStyles.module.scss";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, Tooltip } from "@mui/material";
import { TaskStatusEnum } from "../../../enums/tasksEnums";

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

    const [units, setUnits] = useState<UnitResponseItemSchema[]>(unitsData); // данные для фильтров
    const [selectedUsers, setSelectedUsers] = useState<UserSchema[]>([]);
    const [selectedUnits, setSelectedUnits] = useState<UnitResponseItemSchema[]>([]);
    const [selectedEvents, setSelectedEvents] = useState<EventResponseItemSchema[]>([]);
    const [showClosed, setShowClosed] = useState<boolean>(true); // показывать закрытые и выполненеые

    const [tasks, setTasks] = useState<TaskResponseItemSchema[]>([taskData]);
    const [displayedTasks, setDisplayedTasks] = useState<TaskResponseItemSchema[]>([]);

    useEffect(() => {
        API.units
            .all()
            .then((units: UnitResponseItemSchema[]) => {
                setUnits(units);
            })
            .catch(() => {
                // TODO: ЧТо-то пошло не так
            })
            .finally(() => {});
    }, []);

    const getTasks = () => {
        const params: FilterTasksParamsSchema = buildFilterParams(
            viewedDate,
            selectedUnits,
            selectedEvents,
            selectedUsers
        );

        API.tasks
            .getTasks(params)
            .then((tasks: TaskResponseItemSchema[]) => {
                setTasks(tasks);
            })
            .catch(() => {})
            .finally(() => {});
    };

    useEffect(() => {
        // Получение задач при изменении фильтров или страницы календаря
        getTasks();
    }, [selectedUnits, selectedUnits, selectedEvents, viewedDate]);

    useEffect(() => {
        if (showClosed) {
            // показывать закрытые
            setDisplayedTasks(tasks);
        } else {
            // НЕ показывать закрытые
            setDisplayedTasks(displayedTasks.filter((task) => task.taskStatus !== TaskStatusEnum.COMPLETED));
        }
    }, [showClosed]);

    function resetFilters() {
        setSelectedUnits([]);
        setSelectedUsers([]);
        setSelectedEvents([]);
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <LeftSideButton
                    fullWidth
                    variant="contained"
                    sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    onClick={() => {
                        navigate(CreateNewEventPath);
                    }}
                >
                    Новое событие
                </LeftSideButton>
                <RightSideButton
                    fullWidth
                    variant="contained"
                    onClick={() => {
                        navigate(CreateNewTaskPath);
                    }}
                >
                    Новая задача
                </RightSideButton>
            </div>

            <div>
                <div className="text-center">
                    <Typography variant="subtitle1" component="span">
                        Фильтры
                    </Typography>

                    <Tooltip title="Сбросить фильтры">
                        <IconButton aria-label="reset" color="primary" onClick={resetFilters}>
                            <ReplayIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className={styles.filtersWrapper}>
                    <FilterUnit onChange={setSelectedUnits} selectedValues={selectedUnits} units={units} />
                    <FilterEvent onChange={setSelectedEvents} selectedValues={selectedEvents} />
                    <FilterUser onChange={setSelectedUsers} selectedValues={selectedUsers} units={units} />
                </div>
            </div>

            <MobileCalendar
                tasks={displayedTasks}
                viewedDate={viewedDate}
                setViewedDate={setViewedDate}
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
            />
            <DayTaskList day={chosenDate} tasks={tasks} />
        </>
    );
}

interface DayTaskListProps {
    day: Date;
    tasks: TaskResponseItemSchema[];
}

function DayTaskList(props: DayTaskListProps) {
    const todayDateStr: string = props.day ? getDateRepresentation(props.day) : "";

    const dayTasks: TaskResponseItemSchema[] = props.tasks.filter((task) =>
        isEqualYearMonthDate(new Date(task.expirationTime), props.day)
    );

    if (dayTasks.length === 0) {
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

                {dayTasks.map((task) => (
                    <div className="mb-2" key={task.id}>
                        <TaskPreview key={task.id} task={task} />
                    </div>
                ))}
            </div>
        </>
    );
}
