import React from "react";
import UnitPreview from "../UnitPreview/UnitPreview";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { CreateNewUnitPath } from "../../../routes/paths";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import useUnits from "../../../hooks/useUnits";

export default function UnitList() {
    const navigate = useNavigate();

    const { units, isUnitsLoadingError, isUnitsLoading } = useUnits();

    return (
        <>
            <ScreenHeader text="Отделы департамента информационной политики" />
            {isUnitsLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: "50%" }}>
                    <CircularProgress />
                </Box>
            )}
            {!isUnitsLoading && units.map((unit) => <UnitPreview key={unit.id} unit={unit} />)}

            <SpeedDial
                ariaLabel="create new event"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClick={() => {
                    navigate(CreateNewUnitPath);
                }}
            ></SpeedDial>

            <ErrorSnackbar isOpen={isUnitsLoadingError} handleClose={() => {}}>
                Не удалось загрузить данные!
            </ErrorSnackbar>
        </>
    );
}
