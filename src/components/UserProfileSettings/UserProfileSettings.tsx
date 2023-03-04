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
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import MainAvatar from "../MainAvatar";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function UserProfileSettings() {
    return (
        <Box sx={{ px: 1 }}>
            <UserAvatarSection />
            <UsernameSection />
            <BackupEmailSection />
        </Box>
    );
}

function UserAvatarSection() {
    // текущий пользователь
    const { user } = useAuth();

    const [avatar, setAvatar] = useState<File | null>(null);

    const avatarPlaceholder: string = user?.firstName && user.lastName ? user.firstName[0] + user.lastName[0] : "--";

    const uploadAvatarHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAvatar = event.target.files ? event.target.files[0] : null;
        console.log(newAvatar);
        setAvatar(newAvatar);

        // API.avatars.
    };

    const deleteAvatarHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        API.avatars
            .delete()
            .then(() => {})
            .catch(() => {})
            .finally(() => {});
    };

    return (
        <>
            <Typography variant="h6" component="h2" sx={{ mt: 3 }}>
                Аватар
            </Typography>
            <Divider />

            <Box sx={{ display: "flex", my: 2, mx: 0, px: 0 }}>
                <Box sx={{ mr: 3 }}>
                    <MainAvatar src="sjnfkj/skjk" placeholder={avatarPlaceholder} size={100} />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexGrow: 1 }}>
                    <Button fullWidth variant="contained" component="label" startIcon={<AddCircleIcon />}>
                        Загрузить изображение
                        <input hidden type="file" onInput={uploadAvatarHandler} />
                    </Button>

                    <Tooltip title="Удалить аватар">
                        <IconButton color="error" sx={{ borderWidth: 1, borderRadius: 5, borderColor: "red" }}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </>
    );
}

function UsernameSection() {
    // текущий пользователь
    const { user } = useAuth();

    // данные пользователя
    const [firstName, setFirstName] = useState<string>(user?.firstName || "");
    const [lastName, setLastName] = useState<string>(user?.secondName || "");
    const [patronymic, setPatronymic] = useState<string>(user?.lastName || "");

    // статус запроса на обновление данных
    const [isEditPersonalDataInProgress, setIsEditPersonalDataInProgress] = useState<boolean>(false);
    const [isEditPersonalDataSuccess, setIsEditPersonalDataSuccess] = useState<boolean>(false);
    const [isEditPersonalDataError, setIsEditPersonalDataError] = useState<boolean>(false);

    function editPersonalDataHandler(e: React.MouseEvent) {
        /* Обработчик обновления ФИО. */
        e.preventDefault();
        if (!user?.id) {
            setIsEditPersonalDataError(true);
            return;
        }

        setIsEditPersonalDataInProgress(true);
        const newUserData: UpdateUserInfoRequestSchema = {
            firstName: firstName || undefined,
            lastName: lastName || undefined,
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
            <Typography variant="h6" component="h2" sx={{ mt: 3 }}>
                Данные пользователя
            </Typography>
            <Divider />

            {(!firstName || !lastName) && <Alert severity="error">Укажите Ваше имя!</Alert>}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value.trim())}
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
                Данные успешно обновлены!
            </SuccessSnackbar>

            <ErrorSnackbar handleClose={handleCloseErrorEditPersonalSnackbar} isOpen={isEditPersonalDataError}>
                Произошла ошибка, попробуйте позже
            </ErrorSnackbar>
        </>
    );
}

function BackupEmailSection() {
    // текущий пользователь
    const { user } = useAuth();

    const [email, setEmail] = useState<string>(user?.email || "");

    // статус запроса на обновление резервной почты
    const [isEditEmailInProgress, setIsEditEmailInProgress] = useState<boolean>(false);
    const [isEditEmailSuccess, setIsEditEmailSuccess] = useState<boolean>(false);
    const [isEditEmailError, setIsEditEmailError] = useState<boolean>(false);

    function updateEmail() {
        /* Обработчик обновления резервной почты. */
        if (!user?.id) {
            setIsEditEmailError(true);
            return;
        }

        setIsEditEmailInProgress(true);

        const data: UpdateUserInfoRequestSchema = {
            email: email,
        };
        API.users
            .updateUserInfo(user.id, data)
            .then(() => {
                setIsEditEmailSuccess(true);
            })
            .catch(() => {
                setIsEditEmailError(true);
            })
            .finally(() => {
                setIsEditEmailInProgress(false);
            });
    }

    const handleCloseSuccessSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsEditEmailSuccess(false);
    };
    const handleCloseErrorSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsEditEmailError(false);
    };

    return (
        <>
            <Typography variant="h6" component="h2" sx={{ mt: 3 }}>
                Резервная почта
            </Typography>
            <Divider />

            <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                helperText="При утере пароля эта почта будет использоваться для восстановления доступа к аккаунту"
                name="email"
                autoComplete="email"
            />

            <LoadingButton
                onClick={updateEmail}
                loading={isEditEmailInProgress}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Сохранить новую почту
            </LoadingButton>

            <ErrorSnackbar handleClose={handleCloseErrorSnackbar} isOpen={isEditEmailError}>
                Не удалось обновить резервную почту, попробуйте позже
            </ErrorSnackbar>

            <SuccessSnackbar handleClose={handleCloseSuccessSnackbar} isOpen={isEditEmailSuccess}>
                Резервная почта обновлена!
            </SuccessSnackbar>
        </>
    );
}
