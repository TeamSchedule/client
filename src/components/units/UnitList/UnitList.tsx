import React, { useEffect } from "react";
import UnitPreview from "../UnitPreview/UnitPreview";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { NewTeamIcon } from "../../svg";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import { API } from "../../../api/api";
import { units } from "../../../testdata/data";

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
