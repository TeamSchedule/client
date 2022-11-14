import React, { FormEvent, useEffect, useState } from "react";
import { API } from "../../api/api";

import { useNavigate } from "react-router-dom";
import FormHeaderRow from "../generic/FormHeaderRow";
import InputTextFormItem from "../inputs/InputTextFormItem";
import BaseForm from "../generic/BaseForm";
import { CreateTeamRequestSchema } from "../../api/schemas/requests/teams";
import { BaseButton } from "../buttons";
import ErrorMsg from "../ErrorMsg";
import ERRORS from "../../consts/errors";

const MIN_TEAM_NAME_LEN: number = 3;

export default function TeamCreationForm() {
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState("");
    const [isTeamNameValid, setIsTeamNameValid] = useState<boolean | undefined>();

    const [isActionInProgress, setIsActionInProgress] = useState(false);

    useEffect(() => {
        if (0 < teamName.length && teamName.length <= MIN_TEAM_NAME_LEN) {
            setIsTeamNameValid(false);
        } else {
            setIsTeamNameValid(true);
        }
    }, [teamName]);

    function createTeamSbm(event: FormEvent) {
        event.preventDefault();
        if (teamName.length <= MIN_TEAM_NAME_LEN) {
            alert("Имя команды слишком короткое");
            return;
        }

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
            <div>
                <ErrorMsg visible={!isTeamNameValid} errText={ERRORS.Team.TooShortName} />
            </div>
            <BaseButton text="Создать команду" loading={isActionInProgress} color="common" className="mt-4" />
        </BaseForm>
    );
}
