import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { Unit } from "../../../schemas/instances/units";
import { BaseButton } from "../../buttons";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import ScreenSectionHeader from "../../common/ScreenSectionHeader/ScreenSectionHeader";
import UserPreview from "../../users/UsersPreview/UserPreview";
import { User } from "../../../schemas/instances/users";
import { Task } from "../../../schemas/instances/tasks";
import TaskPreview from "../../tasks/TaskPreview/TaskPreview";

const users: User[] = [
    { id: 1, email: "", fullName: "Сяглова Анна Михайловна", post: "Специалист" },
    { id: 2, email: "", fullName: "Сяглова Анна Михайловна", post: "Специалист" },
    { id: 3, email: "", fullName: "Сяглова Анна Михайловна", post: "Специалист" },
];

const task: Task = { name: "Задача 3", description: "расширенное описание", deadline: new Date(), executors: [] };

export default function FullUnitView() {
    const navigate = useNavigate();

    const { id } = useParams();

    // данные отдела
    const [unit, setUnit] = useState<Unit>();

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
            .then((unit: Unit) => {
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
