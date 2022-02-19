import React, {useState} from "react";
import {API} from "../../../../../api/api";

import {CloseTeamFormIcon, TeamNameItem, TeamSubmitButton} from "./team-form-items";
import {useNavigate} from "react-router";


export default function TeamCreationForm() {
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState();

    // const [teamDescription, setTeamDescription] = useState();


    function createTeamSbm(e) {
        e.preventDefault();

        API.teams.createTeam({
            "name": teamName,
            // "description": teamDescription,
            "membersLogins": [],
        }).then(data => {
            navigate(-1);
        });
    }

    return (
        <form className="p-3 teamCreationForm" onSubmit={createTeamSbm} autoComplete="off">
            <CloseTeamFormIcon />

            <TeamNameItem value={teamName} setValue={setTeamName} />
            {/*<TeamDescriptionItem value={teamDescription} setValue={setTeamDescription} />*/}

            <TeamSubmitButton btnText="Create team" />
        </form>
    );
}
