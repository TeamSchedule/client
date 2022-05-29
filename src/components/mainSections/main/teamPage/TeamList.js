import React, {useEffect, useState} from "react";
import Team from "./Team";
import {API} from "../../../../api/api";


export default function TeamList() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        API.teams.all().then(data => {
            setTeams(data["teams"] || []);
        });
    }, []);

    let teamsList = teams
        .map((team) => <Team data={team} key={team.id} />);

    if (teamsList.length === 0) {
        return <p>You are not a member of any team</p>;
    }

    return (
        <>
            {teamsList}
        </>
    );
}
