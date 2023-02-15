import React, { useState } from "react";
import SimpleTextInput from "../../inputs/SimpleTextInput";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import UserSelector from "../../selectors/UserSelector/UserSelector";
import { CreateUnitRequestSchema } from "../../../api/schemas/requests/units";
import { BaseButton } from "../../buttons";
import { API } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import { UserSchema } from "../../../api/schemas/responses/users";
import UsersSelector from "../../selectors/UsersSelector";

export default function CreateUnitForm() {
    const navigate = useNavigate();

    // данные нового отдела
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [unitHead, setUnitHead] = useState<UserSchema | null>(null);
    const [unitMembers, setUnitMembers] = useState<UserSchema[]>([]);

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);

    function createUnitHandler() {
        setInProgress(true);

        const newUnitData: CreateUnitRequestSchema = {
            name: title,
            description: description,
            head: unitHead?.id,
            members: unitMembers.map((member) => member.id),
        };

        API.units
            .createUnit(newUnitData)
            .then(() => {
                setInProgress(false);
                navigate("..");
            })
            .catch(() => {
                //    TODO: показать сообщение об ошибке - что-то пошло не так
            })
            .finally(() => {
                setInProgress(false);
                navigate("..");
            });
    }

    return (
        <>
            <div>
                <ScreenHeader text="Создание отдела" />

                <SimpleTextInput handleChange={setTitle} value={title} label={"Название отдела"} className="mt-2" />

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

                <BaseButton
                    text="Создать"
                    onClick={createUnitHandler}
                    className="mt-2"
                    color="common"
                    loading={inProgress}
                />
            </div>
        </>
    );
}
