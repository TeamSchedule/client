import React, { useEffect, useState } from "react";
import { API } from "../../api/api";
import { TeamsResponseItemSchema } from "../../api/schemas/responses/teams";
import ShortPreviewTeamItem from "../previews/TeamPreview/ShortPreviewTeamItem";

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
            <h3>Мои команды</h3>
            <div className="d-flex">
                {teams.map((team: TeamsResponseItemSchema) => (
                    <ShortPreviewTeamItem key={team.id} team={team} linkTo={team.id.toString()} />
                ))}
            </div>
        </>
    );
}
