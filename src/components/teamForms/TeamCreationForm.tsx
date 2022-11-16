import React, { FormEvent, useEffect, useState } from "react";
import { API } from "../../api/api";

import { useNavigate } from "react-router-dom";
import FormHeaderRow from "../generic/FormHeaderRow";
import InputTextFormItem from "../inputs/InputTextFormItem";
import BaseForm from "../generic/BaseForm";
import { CreateTeamRequestSchema } from "../../api/schemas/requests/teams";
import { BaseButton } from "../buttons";
import ErrorMsg from "../ErrorMsg";
import { ERRORS, MIN_TEAM_NAME_LEN } from "../../consts";

export default function TeamCreationForm() {
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState<string | null>(null);
    const [isTeamNameValid, setIsTeamNameValid] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const [isActionInProgress, setIsActionInProgress] = useState(false);

    useEffect(() => {
        if (teamName === null || teamName.length < MIN_TEAM_NAME_LEN) {
            setIsTeamNameValid(false);
        } else {
            setIsTeamNameValid(true);
        }
    }, [teamName]);

    useEffect(() => {
        setIsFormValid(Boolean(isTeamNameValid));
    }, [isTeamNameValid]);

    function createTeamSbm(event: FormEvent) {
        event.preventDefault();
        if (teamName === null || teamName.length < MIN_TEAM_NAME_LEN) {
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
            <InputTextFormItem label="*Название команды" value={teamName || ""} handleChange={setTeamName} />
            <div>
                <ErrorMsg visible={teamName !== null && !isTeamNameValid} errText={ERRORS.Team.TooShortName} />
            </div>
            <BaseButton
                text="Создать команду"
                loading={isActionInProgress}
                color="common"
                className="mt-4"
                disabled={!isFormValid}
            />
        </BaseForm>
    );
}
