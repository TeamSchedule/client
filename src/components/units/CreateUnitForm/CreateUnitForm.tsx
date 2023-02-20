import React, { useState } from "react";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import UserSelector from "../../selectors/UserSelector/UserSelector";
import { CreateUnitRequestSchema } from "../../../api/schemas/requests/units";
import { API } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import { UserSchema } from "../../../api/schemas/responses/users";
import UsersSelector from "../../selectors/UsersSelector";
import { Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

export default function CreateUnitForm() {
    const navigate = useNavigate();

    // данные нового отдела
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [unitHead, setUnitHead] = useState<UserSchema | null>(null);
    const [unitMembers, setUnitMembers] = useState<UserSchema[]>([]);

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [isOpenSnack, setIsOpenSnack] = useState<boolean>(false);

    function createUnitHandler() {
        setInProgress(true);

        const newUnitData: CreateUnitRequestSchema = {
            name: title,
            description: description,
            adminId: unitHead?.id,
            members: unitMembers.map((member) => member.id),
        };

        API.units
            .createUnit(newUnitData)
            .then(() => {
                navigate("..");
                setIsOpenSnack(true);
            })
            .catch(() => {
                //    TODO: показать сообщение об ошибке - что-то пошло не так
            })
            .finally(() => {
                setInProgress(false);
                navigate("..");
            });
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsOpenSnack(false);
    };

    return (
        <>
            <Snackbar open={isOpenSnack} autoHideDuration={3000} onClose={handleClose} message="Отдел успешно создан" />
            <div>
                <ScreenHeader text="Создание отдела" />

                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Название отдела"
                />

                <MultilineTextInput
                    value={description}
                    handleChange={setDescription}
                    label={"Описание"}
                    className="mt-2"
                />

                <UserSelector
                    label="Выберите руководителя отдела"
                    className="mt-2"
                    setInputValue={setUnitHead}
                    inputValue={unitHead}
                />

                <UsersSelector
                    label="Добавить сотрудников"
                    className="mt-2"
                    setInputValue={setUnitMembers}
                    inputValue={unitMembers}
                />

                <LoadingButton
                    fullWidth
                    disabled={title.length === 0}
                    onClick={createUnitHandler}
                    loading={inProgress}
                    variant="contained"
                    sx={{ mt: 3 }}
                >
                    Создать
                </LoadingButton>
            </div>
        </>
    );
}
