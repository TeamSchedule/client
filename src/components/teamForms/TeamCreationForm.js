import React, { useState } from "react";
import { API } from "../../api/api";

import { useNavigate } from "react-router";
import SuccessFormButton from "../buttons/SuccessFormButton";
import FormHeaderRow from "../generic/FormHeaderRow";
import InputTextFormItem from "../inputs/InputTextFormItem";

export default function TeamCreationForm() {
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState();
    const [isActionInProgress, setIsActionInProgress] = useState(false);

    function createTeamSbm(e) {
        e.preventDefault();
        setIsActionInProgress(true);
        API.teams
            .create({
                name: teamName,
            })
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsActionInProgress(false);
            });
    }

    return (
        <form className="p-3 teamCreationForm" onSubmit={createTeamSbm} autoComplete="off">
            <FormHeaderRow headerText="Создать новую команду" />
            <InputTextFormItem
                label="Название команды"
                value={teamName}
                handleChange={setTeamName}
            />
            <SuccessFormButton
                btnText="СОЗДАТЬ КОМАНДУ"
                loading={isActionInProgress}
                className="mt-4"
            />
        </form>
    );
}
