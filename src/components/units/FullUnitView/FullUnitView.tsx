import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import ScreenSectionHeader from "../../common/ScreenSectionHeader/ScreenSectionHeader";
import UserPreview from "../../users/UsersPreview/UserPreview";
import TaskPreview from "../../tasks/TaskPreview";
import { taskData, usersData } from "../../../testdata/data";
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

    // раскрыть раздел с задачами
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        /* Получение  данных отдела */
        if (!id) {
            // TODO: ЧТо-то пошло не так
            return;
        }

        if (unitData) return;

        API.units
            .getById(+id)
            .then((unit: UnitResponseItemSchema) => {
                setUnit(unit);
            })
            .catch(() => {
                // TODO: ЧТо-то пошло не так
            })
            .finally();
    }, [id, unitData]);

    const handleCloseSuccessSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsCreatingFinished(false);
    };

    // const members = unit?.members.map((user) => <UserPreview key={user.id} user={user} />);
    const members = usersData.map((user) => <UserPreview user={user} key={user.id} clickable={true} />);

    return (
        <>
            <Card>
                <ScreenHeader text={unit?.name || "Отдел социальных медиа"} />
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
                    <ScreenSectionHeader text="Открытые задачи" />
                    <ExpandMore expand={expanded} aria-expanded={expanded} aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <TaskPreview task={taskData} />
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
        </>
    );
}
