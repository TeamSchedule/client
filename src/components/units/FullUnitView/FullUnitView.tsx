import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import ScreenSectionHeader from "../../common/ScreenSectionHeader/ScreenSectionHeader";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import SpeedDial from "@mui/material/SpeedDial";
import EditIcon from "@mui/icons-material/Edit";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import { TaskStatusEnum } from "../../../enums/tasksEnums";
import TaskListCollapse from "../../common/TaskListCollapse";
import GoBackButton from "../../buttons/GoBackButton";
import { UnitListPath } from "../../../routes/paths";
import { UnitParticipants } from "../common";

export default function FullUnitView() {
    const navigate = useNavigate();

    const { id } = useParams();
    const { state } = useLocation();
    const { created = 0, unitData = null } = state || {}; // считываем значения из state
    window.history.replaceState({}, document.title); // очищаем state

    // если произошел редирект после создания, то true
    const [isCreatingFinished, setIsCreatingFinished] = useState<boolean>(Boolean(created));

    // данные отдела
    const [unit, setUnit] = useState<UnitResponseItemSchema>();
    const [unitTasks, setUnitTasks] = useState<TaskResponseItemSchema[]>([]);

    // статус загрузки данных отдела
    const [isLoadingError, setIsLoadingError] = useState<boolean>(false);

    useEffect(() => {
        /* Получение  данных отдела */
        if (!id) {
            setIsLoadingError(true);
            return;
        }

        if (unitData) {
            setUnit(unitData);
            return;
        }
        API.units
            .getById(+id)
            .then((unit: UnitResponseItemSchema) => {
                setUnit(unit);
            })
            .catch(() => {
                setIsLoadingError(true);
            })
            .finally();

        const params: FilterTasksParamsSchema = {
            departments: [+id],
        };
        API.tasks.getTasks(params).then((tasks: TaskResponseItemSchema[]) => {
            setUnitTasks(tasks);
        });
    }, [id, unitData]);

    const handleCloseSuccessSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsCreatingFinished(false);
    };

    const handleCloseErrorLoadedSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsLoadingError(false);
    };

    const openTasks: TaskResponseItemSchema[] = unitTasks.filter(
        (task) => task.taskStatus === TaskStatusEnum.IN_PROGRESS
    );

    return (
        <>
            <Card>
                <ScreenHeader text={unit?.name || ""} />
                <CardContent>
                    <ScreenSectionHeader text="Состав отдела" />
                    <UnitParticipants admin={unit?.admin} members={unit?.members || []} />
                    <TaskListCollapse tasks={openTasks} title="Открытые задачи" />

                    <GoBackButton to={UnitListPath} buttonText="Вернуться к списку отделов" />
                </CardContent>
            </Card>

            <SpeedDial
                ariaLabel="edit unit"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                icon={<EditIcon />}
                onClick={() => {
                    navigate("edit");
                }}
            ></SpeedDial>

            <SuccessSnackbar handleClose={handleCloseSuccessSnackbar} isOpen={isCreatingFinished}>
                Отдел создан!
            </SuccessSnackbar>

            <ErrorSnackbar handleClose={handleCloseErrorLoadedSnackbar} isOpen={isLoadingError}>
                Ошибка загрузки
            </ErrorSnackbar>
        </>
    );
}
