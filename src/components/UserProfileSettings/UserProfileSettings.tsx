import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { makeAvatarPath } from "../../utils/fileUtils";
import WarningDialog from "../WarningDialog/WarningDialog";
import { UserSchema } from "../../api/schemas/responses/users";
import authUserStore from "../../store/AuthUserStore";
import { observer } from "mobx-react-lite";

export default function UserProfileSettings() {
    return (
        <Box sx={{ px: 1, width: "100%" }}>
            <UserAvatarSection />
            <UsernameSection />
            <BackupEmailSection />
        </Box>
    );
}

const availableImageFormats = ["bmp", "jpg", "jpeg", "gif", "png", "tiff", "svg"];

const UserAvatarSection = observer(() => {
    // текущий пользователь
    const user: UserSchema | undefined = authUserStore.getMe;

    const avatarPlaceholder: string =
        user?.firstName && user.patronymic ? user.firstName[0] + user.patronymic[0] : "--";

    // статус запроса на обновление аватара
    const [isEditAvatarInProgress, setIsEditAvatarInProgress] = useState<boolean>(false);
    const [isEditAvatarError, setIsEditAvatarError] = useState<boolean>(false);

    // состояние видимости окна подтверждения удаления
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false);

    const uploadAvatarHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAvatar = event.target.files ? event.target.files[0] : null;

        if (!user?.id || !newAvatar) {
            return;
        }

        const filename: string = newAvatar.name.toLowerCase();
        const isGoodExt: boolean = availableImageFormats.some((ext) => filename.endsWith(ext));
        if (!isGoodExt) {
            alert("Недопустимое расширение файла! Вставьте картинку");
            return;
        }

        setIsEditAvatarInProgress(true);

        API.avatars
            .set(+user.id, newAvatar)
            .then(() => {
                authUserStore.prefetchMe();
            })
            .catch(() => {
                setIsEditAvatarError(true);
            })
            .finally(() => {
                setIsEditAvatarInProgress(false);
            });
    };

    function onClickDelete() {
        setOpenDeleteConfirm(true);
    }

    const deleteAvatarHandler = () => {
        if (!user?.id) {
            return;
        }

        API.avatars
            .delete(+user.id)
            .then(() => {
                authUserStore.prefetchMe();
            })
            .catch(() => {})
            .finally(() => {});
    };

    const handleCloseErrorEditAvatarSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsEditAvatarError(false);
    };

    return (
        <>
            <Typography variant="h6" component="h2" sx={{ mt: 3 }}>
                Аватар
            </Typography>
            <Divider />

            <Box sx={{ display: "flex", my: 2, mx: 0, px: 0 }}>
                <Box sx={{ mr: 3 }}>
                    <MainAvatar
                        src={user ? makeAvatarPath(user.id, user.avatar.filename) : ""}
                        placeholder={avatarPlaceholder}
                        size={100}
                        fullPath
                    />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", flexGrow: 1, alignItems: "flex-start" }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <LoadingButton
                            fullWidth
                            variant="contained"
                            component="label"
                            startIcon={<AddCircleIcon />}
                            loading={isEditAvatarInProgress}
                        >
                            Загрузить изображение
                            <input hidden type="file" onInput={uploadAvatarHandler} />
                        </LoadingButton>

                        <Typography sx={{ fontSize: "0.9rem", color: "grey" }}>
                            Допустимые типы файлов: {availableImageFormats.join(", ")}
                        </Typography>
                    </Box>

                    <Tooltip title="Удалить аватар">
                        <IconButton
                            color="error"
                            sx={{ borderWidth: 1, borderRadius: 5, borderColor: "red" }}
                            onClick={onClickDelete}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <ErrorSnackbar handleClose={handleCloseErrorEditAvatarSnackbar} isOpen={isEditAvatarError}>
                Произошла ошибка, попробуйте позже
            </ErrorSnackbar>

            <WarningDialog
                open={openDeleteConfirm}
                setOpen={setOpenDeleteConfirm}
                title="Удалить аватар?"
                text={`Вы уверены, что хотите удалить свой аватар?`}
                handleAgree={deleteAvatarHandler}
            />
        </>
    );
});

const UsernameSection = observer(() => {
    // текущий пользователь
    const user: UserSchema | undefined = authUserStore.getMe;

    // данные пользователя
    const [firstName, setFirstName] = useState<string>(user?.firstName || "");
    const [lastName, setLastName] = useState<string>(user?.lastName || "");
    const [patronymic, setPatronymic] = useState<string>(user?.patronymic || "");

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
            firstName: firstName,
            lastName: lastName,
            patronymic: patronymic,
        };
        API.users
            .updateUserInfo(user?.id, newUserData)
            .then(() => {
                setIsEditPersonalDataSuccess(true);
                API.users
                    .getMe()
                    .then((data) => {
                        authUserStore.update(data);
                    })
                    .catch(() => {});
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

    let warningText: string = "";
    if (!firstName && !lastName) warningText = "Укажите Ваше имя и фамилию!";
    else if (!firstName && lastName) warningText = "Укажите Ваше имя!";
    else if (firstName && !lastName) warningText = "Укажите Вашу фамилию!";
    return (
        <>
            <Typography variant="h6" component="h2" sx={{ mt: 3 }}>
                Данные пользователя
            </Typography>
            <Divider />

            {warningText && <Alert severity="error">{warningText}</Alert>}

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
                inputProps={{ maxLength: 50 }}
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
                inputProps={{ maxLength: 50 }}
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
                inputProps={{ maxLength: 50 }}
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
});

function BackupEmailSection() {
    // текущий пользователь
    const user: UserSchema | undefined = authUserStore.getMe;

    const [email, setEmail] = useState<string>(user?.email || "");

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
                disabled
            />
        </>
    );
}
