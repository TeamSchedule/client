import React, { useState } from "react";
import { API } from "../../../../api/api";

import { CloseTeamFormIcon, TeamNameItem } from "./team-form-items";
import { useNavigate } from "react-router";
import SuccessFormButton from "../../../buttons/SuccessFormButton";

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
            <CloseTeamFormIcon />
            <TeamNameItem value={teamName} setValue={setTeamName} />
            <div className="mt-4">
                <SuccessFormButton btnText="СОЗДАТЬ КОМАНДУ" loading={isActionInProgress} />
            </div>
        </form>
    );
}
