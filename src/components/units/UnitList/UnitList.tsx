import React, { useEffect, useState } from "react";
import UnitPreview from "../UnitPreview/UnitPreview";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { NewTeamIcon } from "../../svg";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import { API } from "../../../api/api";
import { units } from "../../../testdata/data";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";

export default function UnitList() {
    const [unitss, setUnits] = useState<UnitResponseItemSchema[]>([]);

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);

    useEffect(() => {
        setInProgress(true);

        API.units
            .all()
            .then((units: UnitResponseItemSchema[]) => {
                setUnits(units);
            })
            .catch(() => {
                // TODO: ЧТо-то пошло не так
            })
            .finally(() => {
                setInProgress(false);
            });
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
