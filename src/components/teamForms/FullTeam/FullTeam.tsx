import React, { useEffect, useState } from "react";

import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { API } from "../../../api/api";
import InputTextFormItem from "../../inputs/InputTextFormItem";
import InputColorFormItem from "../../inputs/InputColorFormItem";
import BaseForm from "../../generic/BaseForm";
import { TeamsResponseItemSchema } from "../../../api/schemas/responses/teams";
import { UpdateTeamRequestSchema } from "../../../api/schemas/requests/teams";
import { BaseButton } from "../../buttons";
import TeamAvatar from "../../avatars/TeamAvatar";
import styles from "./FullTeam.module.scss";

export default function FullTeam() {
    const { teamId } = useParams();
    const navigate = useNavigate();

    const [teamData, setTeamData] = useState<TeamsResponseItemSchema>();
    const [color, setColor] = useState("#000000");
    const [teamName, setTeamName] = useState("");

    // circular loaders
    const [isUpdateActionInProgress, setIsUpdateActionInProgress] = useState(false);
    const [isLeaveActionInProgress, setIsLeaveActionInProgress] = useState(false);

    useEffect(() => {
        if (!teamId) {
            return;
        }

        API.bff
            .getTeamData(+teamId)
            .then((team: TeamsResponseItemSchema) => {
                console.log(team);
                setTeamData(team);
                setTeamName(team.name);
                setColor(team.color);
            })
            .catch(() => {});
    }, [teamId]);

    function onEditTeam(event: React.FormEvent) {
        event.preventDefault();
        setIsUpdateActionInProgress(true);
        if (!teamId) return;

        const updateTeamData: UpdateTeamRequestSchema = {
            newName: teamName,
            color: color,
        };
        API.teams
            .update(+teamId, updateTeamData)
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsUpdateActionInProgress(false);
            });
    }

    function onLeaveTeam() {
        setIsLeaveActionInProgress(true);
        if (!teamId) return;
        API.teams
            .leave(+teamId)
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsLeaveActionInProgress(false);
            });
    }

    return (
        <>
            <BaseForm onSubmit={onEditTeam} autoComplete="false">
                <TeamFormHeader team={teamData} />

                <InputTextFormItem label="Название команды" value={teamName} handleChange={setTeamName} />

                <div className="mt-4 d-flex">
                    <p className="mr-3">Цвет для задач этой команды</p>
                    <InputColorFormItem setColor={setColor} color={color} />
                </div>

                <BaseButton text="Сохранить изменения" loading={isUpdateActionInProgress} color="success" />

                <BaseButton
                    text="Покинуть команду"
                    onClick={onLeaveTeam}
                    loading={isLeaveActionInProgress}
                    color="danger"
                />
                <Outlet context={{ adminId: teamData?.adminId, members: teamData?.members }} />
            </BaseForm>
        </>
    );
}

interface TeamFOrmHeaderProps {
    team?: TeamsResponseItemSchema;
}

function TeamFormHeader(props: TeamFOrmHeaderProps) {
    return (
        <>
            <div className={styles.teamHeader}>
                <TeamAvatar
                    imgSrc={props.team?.avatar || ""}
                    size={50}
                    teamColor={props.team?.color}
                    availableForEditing
                    teamId={props.team?.id.toString()}
                />
                <div className={styles.teamNameMembersTextWrapper}>
                    <p className={styles.teamName}>{props.team?.name}</p>
                    <Link to={"members"}>{props.team?.members.length} участника</Link>
                </div>
            </div>
        </>
    );
}
