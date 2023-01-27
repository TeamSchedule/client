import React from "react";
import { UnitsResponseItemSchema } from "../../api/schemas/responses/units";
import ShortPreviewTeamItem from "../previews/TeamPreview/ShortPreviewTeamItem";

interface TeamListProps {
    teams: Array<UnitsResponseItemSchema>;
}

export default function TeamList(props: TeamListProps) {
    return (
        <>
            <h3>Мои команды</h3>
            <div className="d-flex">
                {props.teams.map((team: UnitsResponseItemSchema) => (
                    <ShortPreviewTeamItem key={team.id} team={team} linkTo={team.id.toString()} />
                ))}
            </div>
        </>
    );
}
