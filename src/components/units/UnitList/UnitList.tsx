import React from "react";
import UnitPreview from "../UnitPreview/UnitPreview";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CreateNewUnitPath } from "../../../routes/paths";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import useApiCall from "../../../hooks/useApiCall";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import { API } from "../../../api/api";
import Grid from "@mui/material/Grid";
import { SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import theme from "../../../assets/theme";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

const Progress = () => (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, width: "100%" }}>
        <CircularProgress />
    </Box>
);

const commonSX: SxProps = {
    minHeight: { xs: 0, md: "calc(100vh - 140px)" },
    maxHeight: { md: "calc(100vh - 140px)" },
    overflowY: "auto",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
};

const borderSX: SxProps = {
    borderWidth: "1px",
    borderColor: "#ababab",
    borderStyle: "solid",
    borderRadius: "5px",
};

const CreateNewUnitButton = () => {
    const navigate = useNavigate();

    function onClick() {
        navigate(CreateNewUnitPath);
    }

    return (
        <>
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                size="medium"
                onClick={onClick}
                sx={{ px: 1, display: { xs: "none", md: "flex" } }}
            >
                Новый отдел
            </Button>
            <IconButton
                color="primary"
                sx={{
                    display: { xs: "block", md: "none" },
                    borderRadius: "50%",
                    border: "1px solid",
                    borderColor: "primary",
                    width: "45px",
                    height: "45px",
                    m: 0,
                    p: 0,
                }}
                onClick={onClick}
            >
                <AddIcon />
            </IconButton>
        </>
    );
};
export default function UnitList() {
    const { id } = useParams();

    const getUnitsApiCall = useApiCall<UnitResponseItemSchema[]>(() => API.units.all(), []);

    const Units = (
        <Box
            sx={{
                borderWidth: 0,
                borderRightWidth: "1px",
                borderRightRadius: 0,
                borderColor: "#ababab",
                borderStyle: "solid",
            }}
        >
            {getUnitsApiCall.loading && <Progress />}
            {getUnitsApiCall.success &&
                getUnitsApiCall.data.map((unit) => (
                    <UnitPreview key={unit.id} unit={unit} selected={unit.id.toString() === (id || "0")} />
                ))}
        </Box>
    );
    return (
        <Box sx={{ ...borderSX, p: 1, pt: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1 }}>
                <Typography
                    component="h1"
                    variant="h1"
                    sx={{ fontSize: { xs: "1rem", md: "1.5rem" }, color: theme.palette.grey.A700, mb: 2, py: 1, my: 0 }}
                >
                    Отделы департамента информационной политики
                </Typography>
                <CreateNewUnitButton />
            </Box>

            <Box sx={{ ...borderSX }}>
                {id && (
                    <Grid container sx={{ justifyContent: "flex-start" }} spacing={1}>
                        <Grid
                            item
                            xs={0}
                            md={5}
                            lg={4}
                            xl={3}
                            sx={{
                                ...commonSX,
                            }}
                        >
                            <Box
                                sx={{
                                    display: { xs: "none", md: "block" },
                                }}
                            >
                                {Units}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7} lg={8} xl={9}>
                            <Box sx={{ p: 1, width: "100%", height: "100%" }}>
                                <Outlet />
                            </Box>
                        </Grid>
                    </Grid>
                )}

                {!id && (
                    <>
                        <Grid container sx={{ justifyContent: "flex-start" }} spacing={1}>
                            <Grid
                                item
                                xs={12}
                                md={5}
                                lg={4}
                                xl={3}
                                sx={{
                                    ...commonSX,
                                }}
                            >
                                <Box>{Units}</Box>
                            </Grid>
                            <Grid item xs={0} md={7} lg={8} xl={9} sx={{ display: { xs: "none", md: "block" } }}>
                                <Typography sx={{ textAlign: "center", mt: 3 }}>
                                    Выберите отдел, чтобы увидеть подробную информацию
                                </Typography>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Box>

            <ErrorSnackbar isOpen={getUnitsApiCall.error} handleClose={getUnitsApiCall.resetApiCallStatus}>
                Не удалось загрузить данные!
            </ErrorSnackbar>
        </Box>
    );
}
