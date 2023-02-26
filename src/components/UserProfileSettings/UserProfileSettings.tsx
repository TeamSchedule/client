import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import { API } from "../../api/api";
import { UpdateUserInfoRequestSchema } from "../../api/schemas/requests/users";
import SuccessSnackbar from "../snackbars/SuccessSnackbar";
import ErrorSnackbar from "../snackbars/ErrorSnackbar";

export default function UserProfileSettings() {
    // текущий пользователь
    const { user } = useAuth();

    // данные пользователя
    const [firstName, setFirstName] = useState<string>(user?.firstName || "");
    const [secondName, setSecondName] = useState<string>(user?.secondName || "");
    const [patronymic, setPatronymic] = useState<string>(user?.lastName || "");

    // статус запроса на обновление данных
    const [isEditPersonalDataInProgress, setIsEditPersonalDataInProgress] = useState<boolean>(false);
    const [isEditPersonalDataSuccess, setIsEditPersonalDataSuccess] = useState<boolean>(false);
    const [isEditPersonalDataError, setIsEditPersonalDataError] = useState<boolean>(false);

    function editPersonalDataHandler(e: React.MouseEvent) {
        e.preventDefault();
        if (!user?.id) {
            setIsEditPersonalDataError(true);
            return;
        }

        setIsEditPersonalDataInProgress(true);
        const newUserData: UpdateUserInfoRequestSchema = {
            firstName: firstName || undefined,
            lastName: secondName || undefined,
            patronymic: patronymic || undefined,
        };
        API.users
            .updateUserInfo(user?.id, newUserData)
            .then(() => {
                setIsEditPersonalDataSuccess(true);
            })
            .catch(() => {
                setIsEditPersonalDataError(true);
            })
            .finally(() => {
                setIsEditPersonalDataInProgress(false);
            });
    }

    const handleCloseSuccessEditPersonalSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsEditPersonalDataSuccess(false);
    };
    const handleCloseErrorEditPersonalSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsEditPersonalDataError(false);
    };

    return (
        <>
            <Typography variant="h6" component="h2">
                Данные пользователя
            </Typography>
            <Divider />
            <TextField
                value={firstName}
                onChange={(e) => setFirstName(e.target.value.trim())}
                margin="dense"
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Имя"
                sx={{ mt: 2 }}
            />
            <TextField
                value={secondName}
                onChange={(e) => setSecondName(e.target.value.trim())}
                margin="dense"
                required
                fullWidth
                id="lastName"
                label="Фамилия"
                name="lastName"
                autoComplete="family-name"
            />
            <TextField
                value={patronymic}
                onChange={(e) => setPatronymic(e.target.value.trim())}
                margin="dense"
                fullWidth
                id="lastName"
                label="Отчество"
                name="lastName"
                autoComplete="family-name"
            />

            <LoadingButton
                onClick={editPersonalDataHandler}
                loading={isEditPersonalDataInProgress}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Применить
            </LoadingButton>

            <SuccessSnackbar handleClose={handleCloseSuccessEditPersonalSnackbar} isOpen={isEditPersonalDataSuccess}>
                Данные успешно обновлены
            </SuccessSnackbar>

            <ErrorSnackbar handleClose={handleCloseErrorEditPersonalSnackbar} isOpen={isEditPersonalDataError}>
                Произошла ошибка, попробуйте позже
            </ErrorSnackbar>
        </>
    );
}
