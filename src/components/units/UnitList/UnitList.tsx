import React, { useEffect, useState } from "react";
import UnitPreview from "../UnitPreview/UnitPreview";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import { API } from "../../../api/api";
import { unitsData } from "../../../testdata/data";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { CreateNewUnitPath } from "../../../routes/paths";

export default function UnitList() {
    const navigate = useNavigate();

    const [units, setUnits] = useState<UnitResponseItemSchema[]>(unitsData);

    useEffect(() => {
        API.units
            .all()
            .then((units: UnitResponseItemSchema[]) => {
                setUnits(units);
            })
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

            <SpeedDial
                ariaLabel="create new event"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClick={() => {
                    navigate(CreateNewUnitPath);
                }}
            ></SpeedDial>
        </>
    );
}
