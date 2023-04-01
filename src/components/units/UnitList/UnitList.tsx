import React from "react";
import UnitPreview from "../UnitPreview/UnitPreview";
import { useNavigate, useParams } from "react-router-dom";
import { CreateNewUnitPath } from "../../../routes/paths";
import Box from "@mui/material/Box";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import useApiCall from "../../../hooks/useApiCall";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import { API } from "../../../api/api";
import Typography from "@mui/material/Typography";
import ListViewContainer from "../../common/ListViewContainer/ListViewContainer";
import Progress from "../../common/Progress";
import CreateNewButton from "../../common/CreateNewButton";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material";
import { UserSchema } from "../../../api/schemas/responses/users";

export default function UnitList() {
    const navigate = useNavigate();
    const theme = useTheme();

    const { id } = useParams();

    const getUnitsApiCall = useApiCall<UnitResponseItemSchema[]>(() => API.units.all(), []);

    const getUsersApiCall = useApiCall<UserSchema[]>(() => API.users.all(), []);

    const LeftBar = (
        <Box>
            {getUnitsApiCall.loading && <Progress />}
            {getUnitsApiCall.success &&
                getUnitsApiCall.data.map((unit) => (
                    <>
                        {/*// TODO: Add filter on unit*/}
                        <UnitPreview
                            key={unit.id}
                            unit={unit}
                            selected={unit.id.toString() === (id || "0")}
                            members={getUsersApiCall.data.filter((user: UserSchema) => true)}
                        />
                        <Divider sx={{ m: 0, backgroundColor: theme.palette.grey.A700 }} />
                    </>
                ))}
        </Box>
    );

    const RightBar = (
        <Typography sx={{ textAlign: "center", mt: 3 }}>Выберите отдел, чтобы увидеть подробную информацию</Typography>
    );

    const TopBar = (
        <>
            <Typography
                component="h1"
                variant="h1"
                sx={{ fontSize: { xs: "1rem", md: "1.5rem" }, color: theme.palette.grey.A700, mb: 2, py: 1, my: 0 }}
            >
                Отделы департамента информационной политики
            </Typography>
            <CreateNewButton text="Новый отдел" onClick={() => navigate(CreateNewUnitPath)} />
        </>
    );

    return (
        <>
            <ListViewContainer LeftBar={LeftBar} RightBar={RightBar} TopBar={TopBar} id={id} />
            <ErrorSnackbar isOpen={getUnitsApiCall.error} handleClose={getUnitsApiCall.resetApiCallStatus}>
                Не удалось загрузить данные!
            </ErrorSnackbar>
        </>
    );
}
