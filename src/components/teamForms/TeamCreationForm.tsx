import React, { FormEvent, useState } from "react";
import { API } from "../../api/api";

import { useNavigate } from "react-router-dom";
import FormHeaderRow from "../generic/FormHeaderRow";
import InputTextFormItem from "../inputs/InputTextFormItem";
import BaseForm from "../generic/BaseForm";
import { CreateTeamRequestSchema } from "../../api/schemas/requests/teams";
import { BaseButton } from "../buttons";

export default function TeamCreationForm() {
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState("");
    const [isActionInProgress, setIsActionInProgress] = useState(false);

    function createTeamSbm(event: FormEvent) {
        event.preventDefault();
        setIsActionInProgress(true);
        const createTeamData: CreateTeamRequestSchema = { name: teamName };
        API.teams
            .createTeam(createTeamData)
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsActionInProgress(false);
            });
    }

    return (
        <BaseForm onSubmit={createTeamSbm} autoComplete={false}>
            <FormHeaderRow headerText="Создать новую команду" />
            <InputTextFormItem label="Название команды" value={teamName} handleChange={setTeamName} />
            <BaseButton text="Создать команду" loading={isActionInProgress} color="common" className="mt-4" />
        </BaseForm>
    );
}
