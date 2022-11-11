import React, { useState } from "react";
import ShortPreviewTeamItem from "../previews/TeamPreview/ShortPreviewTeamItem";
import { Link } from "react-router-dom";
import RightAngleIcon from "../svg/RightAngleIcon";
import BasePreviewSection from "./BasePreviewSection";
import { TeamsResponseItemSchema } from "../../api/schemas/responses/teams";

interface TeamsPreviewSectionProps {
    teams: Array<TeamsResponseItemSchema>;
    err: boolean;
    loading: boolean;
}

function TeamsPreviewSection({ err = false, loading = false, teams = [] }: TeamsPreviewSectionProps) {
    const [isHovering, setIsHovering] = useState(false);
    const editIconColor = isHovering ? "#9b9b9b" : "#d0d0d0";

    if (err) {
        return (
            <>
                <div>Что-то пошло не так)</div>
            </>
        );
    }

    return (
        <BasePreviewSection>
            <Link
                to="teams"
                className="d-flex justify-content-between align-items-baseline text-black"
                onMouseLeave={() => setIsHovering(false)}
                onMouseEnter={() => setIsHovering(true)}
            >
                <h2 className="mb-4">Команды</h2>
                <RightAngleIcon color={editIconColor} size={40} />
            </Link>

            <PreviewTeamsGroup teams={teams} />
        </BasePreviewSection>
    );
}

export default TeamsPreviewSection;

interface PreviewTeamsGroupProps {
    teams: Array<TeamsResponseItemSchema>;
}

function PreviewTeamsGroup({ teams = [] }: PreviewTeamsGroupProps) {
    if (teams.length === 0) {
        return (
            <div>
                <span className="fs-5" style={{ color: "gray" }}>
                    Вы еще не состоите в командах
                </span>
                <Link to="teams/new" className="ml-2 fs-5">
                    Создать
                </Link>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center">
            {teams.map((team) => (
                <ShortPreviewTeamItem key={team.id} team={team} />
            ))}
        </div>
    );
}
