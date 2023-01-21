import React, { useEffect } from "react";
import UnitPreview from "../UnitPreview/UnitPreview";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { NewTeamIcon } from "../../svg";
import { User } from "../../../schemas/instances/users";
import { Unit } from "../../../schemas/instances/units";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import { API } from "../../../api/api";

const user1: User = { id: 1, email: "", fullName: "Сяглова Анна Михайловна", post: "Специалист" };
const user2: User = { id: 2, email: "", fullName: "Сяглова Анна Михайловна", post: "Специалист" };
const user3: User = { id: 3, email: "", fullName: "Сяглова Анна Михайловна", post: "Специалист" };

const units: Unit[] = [
    { id: 1, name: "Отдел социальных медиа", members: [user1, user2, user3], openTasks: 4 },
    { id: 2, name: "Отдел социальных медиа", members: [user1, user2], openTasks: 0 },
    { id: 3, name: "Отдел социальных медиа", members: [user1, user2], openTasks: 2 },
];

export default function UnitList() {
    useEffect(() => {
        API.units
            .all()
            .then(() => {})
            .catch(() => {
                // TODO: ЧТо-то пошло не так
            })
            .finally(() => {});
    }, []);

    return (
        <>
            <ScreenHeader text="Отделы департамента информационной политики" />

            {units.map((unit) => (
                <UnitPreview key={unit.id} unit={unit} />
            ))}

            <div className="mb-2">
                <CreateNewTeamButton />
            </div>
        </>
    );
}

function CreateNewTeamButton() {
    return (
        <>
            <Link to="new">
                <Button className="p-2 px-3 w-100" variant="outlined" startIcon={<NewTeamIcon size={28} />}>
                    Новый отдел
                </Button>
            </Link>
        </>
    );
}
