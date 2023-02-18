import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { BaseButton } from "../../buttons";
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

        API.units
            .getById(+id)
            .then((unit: UnitResponseItemSchema) => {
                setUnit(unit);
            })
            .catch(() => {
                // TODO: ЧТо-то пошло не так
            })
            .finally();
    }, [id]);

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

                <BaseButton text="Изменить" onClick={() => navigate("edit")} className="mt-2" color="common" />
            </Card>
        </>
    );
}
