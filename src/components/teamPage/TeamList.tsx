import React from "react";
import { TeamsResponseItemSchema } from "../../api/schemas/responses/teams";
import ShortPreviewTeamItem from "../previews/TeamPreview/ShortPreviewTeamItem";

interface TeamListProps {
    teams: Array<TeamsResponseItemSchema>;
}

export default function TeamList(props: TeamListProps) {
    return (
        <>
            <h3>Мои команды</h3>
            <div className="d-flex">
                {props.teams.map((team: TeamsResponseItemSchema) => (
                    <ShortPreviewTeamItem key={team.id} team={team} linkTo={team.id.toString()} />
                ))}
            </div>
        </>
    );
}
