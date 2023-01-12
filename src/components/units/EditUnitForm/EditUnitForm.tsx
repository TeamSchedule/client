import React, { useEffect, useState } from "react";
import SimpleTextInput from "../../inputs/SimpleTextInput";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import UserSelector from "../../selectors/UserSelector/UserSelector";
import { User } from "../../../schemas/instances/users";
import { CreateUnitRequestSchema } from "../../../schemas/requests/units";
import { BaseButton } from "../../buttons";
import { API } from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";

const testUsers: User[] = [
    { id: 1, email: "", fullName: "a b c", post: "Специалист" },
    { id: 2, email: "", fullName: "a b c", post: "Специалист" },
    { id: 3, email: "", fullName: "a b c", post: "Специалист" },
];

export default function EditUnitForm() {
    const navigate = useNavigate();

    // id отдела из пути
    const { id } = useParams();

    // данные отдела
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [unitHead, setUnitHead] = useState<User | null>(null);
    const [unitMembers, setUnitMembers] = useState<Array<User>>([]);

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);

    useEffect(() => {
        if (!id) {
            //    TODO: bad id Что-то пошло не так
            return;
        }
        // API.units
        //     .getById(+id)
        //     .then(() => {
        //         // setTitle("");
        //         // setDescription("");
        //         // setUnitMembers([]);
        //         // setUnitHead({});
        //     })
        //     .catch(() => {
        //         //    TODO: Что-то пошло не так
        //     })
        //     .finally(() => {});
    }, []);

    function editUnitHandler() {
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
                    users={testUsers}
                    className="mt-2"
                    handleChange={setUnitHead}
                />

                <UserSelector
                    label="Выберите сотрудников отдела"
                    placeholder="Сотрудники"
                    users={testUsers}
                    className="mt-2"
                    handleChange={setUnitMembers}
                    multiple={true}
                />

                <BaseButton
                    text="Сохранить изменения"
                    onClick={editUnitHandler}
                    className="mt-2"
                    color="common"
                    loading={inProgress}
                />
            </div>
        </>
    );
}
