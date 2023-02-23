import React, { useEffect, useState } from "react";
import MobileCalendar from "../MobileCalendar";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { eventsData, taskData, unitsData } from "../../../testdata/data";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { CreateNewTaskPath } from "../../../routes/paths";
import Typography from "@mui/material/Typography";
import { API } from "../../../api/api";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import buildFilterParams from "../../../api/utils/buildFilterParams";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FiltersDrawer from "../filters/FiltersDrawer";
import DayTaskList from "./DayTaskList";
import DefaultDict from "../../../utils/defaultdict";

export default function FullCalendarMobileView() {
    const navigate = useNavigate();

    // начало просматриваемого месяца
    const [viewedDate, setViewedDate] = useState<Date>(new Date()); // дата, в диапазоне которой показываются задачи
    const [chosenDate, setChosenDate] = useState<Date>(new Date()); // выбранный день, для него показываюся задачи на мобильной версии

    // данные для фильтров
    const [units, setUnits] = useState<UnitResponseItemSchema[]>(unitsData);
    const [events, setEvents] = useState<EventResponseItemSchema[]>(eventsData);

    // фильтры
    const [selectedUsers, setSelectedUsers] = useState<object>(DefaultDict());
    const [selectedUnitsIds, setSelectedUnitsIds] = useState<object>(DefaultDict());
    const [selectedEventsIds, setSelectedEventsIds] = useState<object>(DefaultDict());

    // все задачи в диапазоне нескольких месяцев
    const [tasks, setTasks] = useState<TaskResponseItemSchema[]>([taskData]);
    // отображаемые задачи
    const [displayedTasks, setDisplayedTasks] = useState<TaskResponseItemSchema[]>([]);

    useEffect(() => {
        // Получение данных по отделам (пользователи внутри) и событиям для формирования фильтров
        API.units
            .all()
            .then((units: UnitResponseItemSchema[]) => {
                setUnits(units);
            })
            .catch(() => {
                // TODO: ЧТо-то пошло не так
            })
            .finally(() => {});

        API.events
            .all()
            .then((events: EventResponseItemSchema[]) => {
                setEvents(events);
            })
            .catch(() => {
                // TODO: ЧТо-то пошло не так
            })
            .finally(() => {});
    }, []);

    const getTasks = () => {
        const params: FilterTasksParamsSchema = buildFilterParams(viewedDate, [], [], []);

        API.tasks
            .getTasks(params)
            .then((tasks: TaskResponseItemSchema[]) => {
                setTasks(tasks);
            })
            .catch(() => {})
            .finally(() => {});
    };

    useEffect(() => {
        // TODO: Получение задач при изменении фильтров или страницы календаря
        getTasks();
    }, []);

    function resetFilters() {
        setSelectedUnitsIds(() => DefaultDict());
        setSelectedUsers(() => DefaultDict());
        setSelectedEventsIds(() => DefaultDict());
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={() => {
                        navigate(CreateNewTaskPath);
                    }}
                    color="secondary"
                >
                    Задача
                </Button>
                <FiltersDrawer
                    events={events}
                    units={units}
                    resetFiltersHandler={resetFilters}
                    selectedUnits={selectedUnitsIds}
                    setSelectedUnits={setSelectedUnitsIds}
                    selectedEventsIds={selectedEventsIds}
                    setSelectedEventsIds={setSelectedEventsIds}
                    selectedUsersIds={selectedUsers}
                    setSelectedUsersIds={setSelectedUsers}
                />
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
