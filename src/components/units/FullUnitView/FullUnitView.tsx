import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import TaskListCollapse from "../../common/TaskListCollapse";
import { UnitParticipants } from "../common";
import { getOnlyCompletedTasks, getOnlyOpenTasks } from "../../../utils/taskUtils";
import { API } from "../../../api/api";
import useApiCall from "../../../hooks/useApiCall";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UserSchema } from "../../../api/schemas/responses/users";
import taskStore from "../../../store/TaskStore";
import { observer } from "mobx-react-lite";

function FullUnitView() {
    const navigate = useNavigate();

    const urlParams = useParams();
    const id: number = +(urlParams.id || 0);

    const { state } = useLocation();
    const { created = 0 } = state || {}; // считываем значения из state
    window.history.replaceState({}, document.title); // очищаем state

    const params = useMemo(() => {
        return {
            departments: [id],
        };
    }, [id]);

    const getTasksApiCall = useApiCall<TaskResponseItemSchema[]>(() => API.tasks.getTasks(params), [], [id]);
    useEffect(() => {
        taskStore.updateMany(getTasksApiCall.data);
    }, [getTasksApiCall.data]);

    // если произошел редирект после создания, то true
    const [isCreatingFinished, setIsCreatingFinished] = useState<boolean>(Boolean(created));

    // данные отдела
    const getUnitApiCall = useApiCall<UnitResponseItemSchema | undefined>(() => API.units.getById(id), undefined, [id]);
    const unit = getUnitApiCall.data;

    // пользователи отдела
    const getAllUsersApiCall = useApiCall<UserSchema[]>(() => API.users.all(), [], []);
    /*// TODO: Add filter on unit*/
    const members: UserSchema[] = getAllUsersApiCall.data.filter((user: UserSchema) => true);

    const handleCloseSuccessSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsCreatingFinished(false);
    };

    const unitTasks: TaskResponseItemSchema[] = taskStore.getUnitTasks(id);
    const openTasks: TaskResponseItemSchema[] = getOnlyOpenTasks(unitTasks);
    const completedTasks: TaskResponseItemSchema[] = getOnlyCompletedTasks(unitTasks);

    if (!id) return null;

    return (
        <>
            <Card
                elevation={0}
                sx={{
                    borderRadius: 0,
                    p: 1,
                    pt: 0,
                    mt: 0,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography component="h2" variant="subtitle1" sx={{ textAlign: "center" }}>
                    {unit?.name || ""}
                </Typography>
                <Typography component="p" variant="body1" sx={{ textAlign: "left" }}>
                    {unit?.description || ""}
                </Typography>
                <CardContent sx={{ px: 0 }}>
                    <Typography component="h3" variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        Состав отдела
                    </Typography>
                    {unit?.admin && <UnitParticipants admin={unit.admin} members={members} />}

                    <TaskListCollapse
                        tasks={openTasks}
                        title={`Открытые задачи (${completedTasks.length}/${getTasksApiCall.data.length})`}
                    />

                    <TaskListCollapse
                        tasks={completedTasks}
                        title={`Закрытые задачи (${completedTasks.length})`}
                        isCollapse
                    />
                </CardContent>
                <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    size="medium"
                    onClick={() => {
                        navigate("edit");
                    }}
                >
                    Редактировать
                </Button>
            </Card>

            <SuccessSnackbar handleClose={handleCloseSuccessSnackbar} isOpen={isCreatingFinished}>
                Отдел создан!
            </SuccessSnackbar>

            <ErrorSnackbar handleClose={getUnitApiCall.resetApiCallStatus} isOpen={getUnitApiCall.error}>
                Ошибка загрузки
            </ErrorSnackbar>
        </>
    );
}

export default observer(FullUnitView);
