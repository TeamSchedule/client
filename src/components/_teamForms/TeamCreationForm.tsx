import React, { FormEvent, useEffect, useState } from "react";
import { API } from "../../api/api";

import { useNavigate } from "react-router-dom";
import FormHeaderRow from "../generic/FormHeaderRow";
import BaseForm from "../generic/BaseForm";
import { CreateUnitRequestSchema } from "../../api/schemas/requests/units";
import { BaseButton } from "../buttons";
import ErrorMsg from "../ErrorMsg";
import { ERRORS, MIN_TEAM_NAME_LEN } from "../../consts";
import SimpleTextInput from "../inputs/SimpleTextInput";

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
        const createTeamData: CreateUnitRequestSchema = { name: teamName };
        API.units
            .createUnit(createTeamData)
            .then(() => {
                navigate("../");
            })
            .finally(() => {
                setIsActionInProgress(false);
            });
    }

    return (
        <BaseForm onSubmit={createTeamSbm} autoComplete={false}>
            <FormHeaderRow headerText="Создать новую команду" />
            <SimpleTextInput label="*Название команды" value={teamName || ""} handleChange={setTeamName} />
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
