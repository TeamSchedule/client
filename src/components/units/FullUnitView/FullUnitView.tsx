import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { BaseButton } from "../../buttons";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import ScreenSectionHeader from "../../common/ScreenSectionHeader/ScreenSectionHeader";
import UserPreview from "../../users/UsersPreview/UserPreview";
import TaskPreview from "../../tasks/TaskPreview/TaskPreview";
import { task, users } from "../../../testdata/data";
import { UnitsResponseItemSchema } from "../../../api/schemas/responses/units";

export default function FullUnitView() {
    const navigate = useNavigate();

    const { id } = useParams();

    // данные отдела
    const [unit, setUnit] = useState<UnitsResponseItemSchema>();

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);

    useEffect(() => {
        /* Получение  данных отдела */
        if (!id) {
            // TODO: ЧТо-то пошло не так
            return;
        }

        setInProgress(true);
        API.units
            .getById(+id)
            .then((unit: UnitsResponseItemSchema) => {
                setInProgress(false);
                setUnit(unit);
            })
            .catch(() => {
                // TODO: ЧТо-то пошло не так
            })
            .finally();
    }, []);

    // const members = unit?.members.map((user) => <UserPreview key={user.id} user={user} />);
    const members = users.map((user) => <UserPreview user={user} key={user.id} clickable={true} />);

    return (
        <>
            <div>
                <ScreenHeader text={unit?.name || "Отдел социальных медиа"} />

                <ScreenSectionHeader text="Открытые задачи" />
                <TaskPreview task={task} />

                <ScreenSectionHeader text="Состав отдела" />
                {members}

                <BaseButton text="Изменить" onClick={() => navigate("edit")} className="mt-2" color="common" />
            </div>
        </>
    );
}
