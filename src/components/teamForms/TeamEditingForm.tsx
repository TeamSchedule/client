import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

import { Outlet, useNavigate, useParams } from "react-router-dom";
import { API } from "../../api/api";
import MemberItem from "./MemberItem";
import FormHeaderRow from "../generic/FormHeaderRow";
import InputTextFormItem from "../inputs/InputTextFormItem";
import InputColorFormItem from "../inputs/InputColorFormItem";
import BaseForm from "../generic/BaseForm";
import { CreateInvitationsRequestSchema } from "../../api/schemas/requests/invitations";
import { TeamMembersItemSchema, TeamsResponseItemSchema } from "../../api/schemas/responses/teams";
import { UpdateTeamRequestSchema } from "../../api/schemas/requests/teams";
import OutgoingInvitationList from "../teamPage/OutgoingInvitationList";
import { BaseButton } from "../buttons";
import TeamAvatar from "../avatars/TeamAvatar";

export default function TeamEditingForm() {
    const { teamId } = useParams();
    const navigate = useNavigate();

    const [teamData, setTeamData] = useState<TeamsResponseItemSchema>();
    const [color, setColor] = useState("#000000");
    const [teamName, setTeamName] = useState("");

    const [usersToInvite, setUsersToInvite] = useState<Array<number>>([]);

    // circular loaders
    const [isUpdateActionInProgress, setIsUpdateActionInProgress] = useState(false);
    const [isInviteActionInProgress, setIsInviteActionInProgress] = useState(false);
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

    function onSendInvites(event: React.FormEvent) {
        event.preventDefault();
        setIsInviteActionInProgress(true);
        if (!teamId) return;

        const createInvitationData: CreateInvitationsRequestSchema = {
            teamId: +teamId,
            // @ts-ignore
            invitedIds: usersToInvite.map((user) => user.id),
        };
        API.invitations
            .createInvite(createInvitationData)
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsInviteActionInProgress(false);
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
                <FormHeaderRow headerText="Редактировать команду" />

                <TeamAvatar imgSrc={teamData?.avatar || ""} size={80} teamColor={color} availableForEditing teamId={teamId} />
                <InputTextFormItem label="Название команды" value={teamName} handleChange={setTeamName} />

                <div className="mt-4 d-flex">
                    <p className="mr-3">Цвет для задач этой команды</p>
                    <InputColorFormItem setColor={setColor} color={color} />
                </div>

                <BaseButton text="Сохранить изменения" loading={isUpdateActionInProgress} color="success" />

                <ParticipantList participants={teamData?.members} adminId={teamData?.adminId} />

                <p className="mt-4">Пригласить новых пользователей:</p>
                <AutocompleteUsers
                    onSendInvites={onSendInvites}
                    usersToInvite={usersToInvite}
                    setUsersToInvite={setUsersToInvite}
                    isInviteActionInProgress={isInviteActionInProgress}
                />
                <OutgoingInvitationList teamId={teamId ? +teamId : null} />
                <BaseButton
                    text="Покинуть команду"
                    onClick={onLeaveTeam}
                    loading={isLeaveActionInProgress}
                    color="danger"
                />
            </BaseForm>
            <Outlet />
        </>
    );
}

interface AutocompleteUsersProps {
    onSendInvites: (event: React.FormEvent) => void;
    usersToInvite: Array<number>;
    setUsersToInvite: (event: React.SetStateAction<number[]>) => void;
    isInviteActionInProgress: boolean;
}

function AutocompleteUsers(props: AutocompleteUsersProps) {
    const [username, setUsername] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);

    useEffect(() => {
        if (username.length > 2) {
            API.users.filterByUsername(username).then((users) => {
                setFoundUsers(users);
            });
        }
    }, [username]);

    return (
        <div className="my-4">
            <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={foundUsers}
                // @ts-ignore
                getOptionLabel={(option) => option.login}
                // @ts-ignore
                onChange={(e, v) => props.setUsersToInvite(v)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Имя пользователя"
                        placeholder="Имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                )}
            />

            <BaseButton
                text="Пригласить"
                className="mt-3"
                onClick={props.onSendInvites}
                disabled={!props.usersToInvite || +props.usersToInvite.length === 0}
                loading={props.isInviteActionInProgress}
                color="common"
            />
        </div>
    );
}

interface ParticipantListProps {
    participants?: Array<TeamMembersItemSchema>;
    adminId?: number;
}

function ParticipantList(props: ParticipantListProps) {
    if (!props.participants || props.participants.length === 0) {
        return null;
    }

    return (
        <>
            <p className="mt-4">Состав команды</p>
            <div>
                {props.participants.map((participant) => (
                    <MemberItem key={participant.id} member={participant} isAdmin={participant.id === props.adminId} />
                ))}
            </div>
        </>
    );
}
