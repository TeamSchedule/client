import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import ScreenSectionHeader from "../../common/ScreenSectionHeader/ScreenSectionHeader";
import UserPreview from "../../users/UsersPreview/UserPreview";
import TaskPreview from "../../tasks/TaskPreview";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import SpeedDial from "@mui/material/SpeedDial";
import EditIcon from "@mui/icons-material/Edit";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import Typography from "@mui/material/Typography";
import { TaskStatusEnum } from "../../../enums/tasksEnums";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

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

    // раскрыть раздел с задачами
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        /* Получение  данных отдела */
        if (!id) {
            setIsLoadingError(true);
            return;
        }

        if (unitData) return;

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
            from: new Date("2000-01-01").toJSON(),
            to: new Date("2100-01-01").toJSON(),
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

    const members = unit?.members.map((user) => <UserPreview user={user} key={user.id} clickable={true} />);
    const openTasks: TaskResponseItemSchema[] = unitTasks.filter(
        (task) => task.taskStatus === TaskStatusEnum.IN_PROGRESS
    );

    return (
        <>
            <Card>
                <ScreenHeader text={unit?.name || ""} />
                <CardContent>
                    <ScreenSectionHeader text="Состав отдела" />
                    {members}
                </CardContent>

                <CardActions
                    disableSpacing
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                    onClick={handleExpandClick}
                >
                    <Typography variant="subtitle1" component="h2" sx={{ fontWeight: "bold" }}>
                        Открытые задачи - {openTasks.length}
                    </Typography>
                    <ExpandMore expand={expanded} aria-expanded={expanded} aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {openTasks.map((task) => (
                        <TaskPreview key={task.id} task={task} />
                    ))}
                </Collapse>
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
