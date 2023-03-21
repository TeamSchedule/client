import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useMemo, useState } from "react";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import ScreenSectionHeader from "../../common/ScreenSectionHeader/ScreenSectionHeader";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import SpeedDial from "@mui/material/SpeedDial";
import EditIcon from "@mui/icons-material/Edit";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import TaskListCollapse from "../../common/TaskListCollapse";
import GoBackButton from "../../buttons/GoBackButton";
import { UnitListPath } from "../../../routes/paths";
import { UnitParticipants } from "../common";
import { getOnlyOpenTasks } from "../../../utils/taskUtils";
import { API } from "../../../api/api";
import useApiCall from "../../../hooks/useApiCall";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";

export default function FullUnitView() {
    const navigate = useNavigate();

    const { id } = useParams();
    const { state } = useLocation();
    const { created = 0 } = state || {}; // считываем значения из state
    window.history.replaceState({}, document.title); // очищаем state

    const params = useMemo(() => {
        return {
            departments: [id ? +id : 0],
        };
    }, [id]);

    const getTasksApiCall = useApiCall<TaskResponseItemSchema[]>(() => API.tasks.getTasks(params), []);

    // если произошел редирект после создания, то true
    const [isCreatingFinished, setIsCreatingFinished] = useState<boolean>(Boolean(created));

    // данные отдела
    const getUnitApiCall = useApiCall<UnitResponseItemSchema | undefined>(
        () => API.units.getById(id ? +id : 0),
        undefined
    );
    const unit = getUnitApiCall.data;

    const handleCloseSuccessSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsCreatingFinished(false);
    };

    const openTasks: TaskResponseItemSchema[] = getOnlyOpenTasks(getTasksApiCall.data);

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

            <ErrorSnackbar handleClose={getUnitApiCall.resetApiCallStatus} isOpen={getUnitApiCall.error}>
                Ошибка загрузки
            </ErrorSnackbar>
        </>
    );
}
