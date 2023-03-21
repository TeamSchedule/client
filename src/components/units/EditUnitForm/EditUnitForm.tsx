import React, { useEffect, useState } from "react";
import SimpleTextInput from "../../inputs/SimpleTextInput";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import UserSelector from "../../selectors/UserSelector/UserSelector";
import { CreateUnitRequestSchema } from "../../../api/schemas/requests/units";
import { API } from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import { UserSchema } from "../../../api/schemas/responses/users";
import UsersSelector from "../../selectors/UsersSelector";
import LoadingButton from "@mui/lab/LoadingButton";
import { makeUnitLinkById } from "../../../routes/paths";
import GoBackButton from "../../buttons/GoBackButton";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import useApiCall from "../../../hooks/useApiCall";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";

export default function EditUnitForm() {
    const navigate = useNavigate();

    // id отдела из пути
    const { id } = useParams();

    // данные отдела
    const getUnitApiCall = useApiCall<UnitResponseItemSchema | undefined>(
        () => API.units.getById(id ? +id : 0),
        undefined
    );
    const unit = getUnitApiCall.data;

    // данные отдела
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [unitHead, setUnitHead] = useState<UserSchema | null>(null);
    const [unitMembers, setUnitMembers] = useState<UserSchema[]>([]);

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);

    const [isEditingFinished, setIsEditingFinished] = useState<boolean>(false);
    const [isEditingError, setIsEditingError] = useState<boolean>(false);

    useEffect(() => {
        if (unit !== undefined) {
            setTitle(unit.name);
            setDescription(unit.description);
            setUnitMembers(unit.members);
            setUnitHead(unit.admin);
        }
    }, [unit]);

    function editUnitHandler(event: React.MouseEvent) {
        event.preventDefault();
        if (!id) {
            setIsEditingError(true);
            return;
        }

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
                setIsEditingFinished(true);
                navigate("..");
            })
            .catch(() => {
                setIsEditingError(true);
            })
            .finally(() => {
                setInProgress(false);
                navigate("..");
            });
    }

    const handleCloseEditSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsEditingFinished(false);
    };

    const handleCloseErrorSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsEditingError(false);
    };

    return (
        <>
            <div>
                <ScreenHeader text="Изменение отдела" />

                <SimpleTextInput handleChange={setTitle} value={title} label={"Название отдела"} className="mt-2" />

                <MultilineTextInput
                    value={description}
                    handleChange={setDescription}
                    label={"Описание"}
                    className="mt-2"
                />

                <UserSelector
                    label="Выберите руководителя отдела"
                    placeholder="Руководитель"
                    className="mt-2"
                    setInputValue={setUnitHead}
                    inputValue={unitHead}
                />

                <UsersSelector
                    label="Добавить сотрудников"
                    placeholder="Сотрудники"
                    className="mt-2"
                    setInputValue={setUnitMembers}
                    inputValue={unitMembers}
                />

                <LoadingButton
                    onClick={editUnitHandler}
                    loading={inProgress}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Сохранить изменения
                </LoadingButton>

                <GoBackButton to={id ? makeUnitLinkById(+id) : ".."} />
            </div>

            <SuccessSnackbar handleClose={handleCloseEditSnackbar} isOpen={isEditingFinished}>
                Изменения сохранены!
            </SuccessSnackbar>

            <ErrorSnackbar handleClose={handleCloseErrorSnackbar} isOpen={isEditingError}>
                Не удалось сохранить изменения!
            </ErrorSnackbar>
        </>
    );
}
