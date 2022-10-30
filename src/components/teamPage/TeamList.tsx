import React, { useEffect, useState } from "react";
import TeamItem from "./TeamItem";
import { API } from "../../api/api";
import { TeamsResponseItemSchema } from "../../api/schemas/responses/teams";

export default function TeamList() {
    const [teams, setTeams] = useState<Array<TeamsResponseItemSchema>>([]);

    useEffect(() => {
        API.teams
            .all()
            .then((teamList: Array<TeamsResponseItemSchema>) => {
                setTeams(teamList);
            })
            .catch(() => {});
    }, []);
    return (
        <>
            <div>
                {teams.map((team: TeamsResponseItemSchema) => (
                    <TeamItem team={team} key={team.id} />
                ))}
            </div>
        </>
    );
}
