import React, { useEffect, useState } from "react";
import UnitPreview from "../UnitPreview/UnitPreview";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import { API } from "../../../api/api";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { CreateNewUnitPath } from "../../../routes/paths";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";

export default function UnitList() {
    const navigate = useNavigate();

    const [units, setUnits] = useState<UnitResponseItemSchema[]>([]);

    const [unitsLoading, setUnitsLoading] = useState<boolean>(true);
    const [isLoadingError, setIsLoadingError] = useState<boolean>(false);

    useEffect(() => {
        API.units
            .all()
            .then((units: UnitResponseItemSchema[]) => {
                setUnits(units);
            })
            .catch(() => {
                setIsLoadingError(true);
            })
            .finally(() => {
                setUnitsLoading(false);
            });
    }, []);

    const handleCloseErrorSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsLoadingError(false);
    };

    return (
        <>
            <ScreenHeader text="Отделы департамента информационной политики" />
            {unitsLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: "50%" }}>
                    <CircularProgress />
                </Box>
            )}
            {!unitsLoading && units.map((unit) => <UnitPreview key={unit.id} unit={unit} />)}

            <SpeedDial
                ariaLabel="create new event"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClick={() => {
                    navigate(CreateNewUnitPath);
                }}
            ></SpeedDial>

            <ErrorSnackbar handleClose={handleCloseErrorSnackbar} isOpen={isLoadingError}>
                Не удалось загрузить данные!
            </ErrorSnackbar>
        </>
    );
}
