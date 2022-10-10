import React, {useState} from "react";
import {API} from "../../../../api/api";

import {CloseTeamFormIcon, TeamNameItem} from "./team-form-items";
import {useNavigate} from "react-router";
import SuccessFormButton from "../../../generic/SuccessFormButton";


export default function TeamCreationForm() {
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState();


    function createTeamSbm(e) {
        e.preventDefault();

        API.teams.create({
            "name": teamName
        }).then(() => {
            navigate(-1);
        });
    }

    return (
        <form className="p-3 teamCreationForm" onSubmit={createTeamSbm} autoComplete="off">
            <CloseTeamFormIcon/>
            <TeamNameItem value={teamName} setValue={setTeamName}/>
            <SuccessFormButton btnText="СОЗДАТЬ КОМАНДУ"/>
        </form>
    );
}
