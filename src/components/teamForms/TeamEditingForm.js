import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import List from "@mui/material/List";

import { useNavigate, useParams } from "react-router";
import { API } from "../../api/api";
import { TeamMemberItem } from "./TeamMemberItem";
import { UnprocessedOutgoingInvitationItem } from "../invitations/UnprocessedOutgoingInvitationItem";
import SuccessFormButton from "../buttons/SuccessFormButton";
import RemovalFormButton from "../buttons/RemovalFormButton";
import CommonActionFormButton from "../buttons/CommonActionFormButton";
import FormHeaderRow from "../generic/FormHeaderRow";
import InputTextFormItem from "../inputs/InputTextFormItem";
import "../teamPage/teamPage.css";
import InputColorFormItem from "../inputs/InputColorFormItem";

export default function TeamEditingForm() {
    const { teamId } = useParams();
    const [color, setColor] = useState("#000000");
    const [initialColor, setInitialColor] = useState("#ffffff");

    const navigate = useNavigate();
    const [teamName, setTeamName] = useState("");
    const [unprocessedInvitations, setUnprocessedInvitations] = useState([]);

    const [usersToInvite, setUsersToInvite] = useState([]);

    // circular loaders
    const [isUpdateActionInProgress, setIsUpdateActionInProgress] = useState(false);
    const [isInviteActionInProgress, setIsInviteActionInProgress] = useState(false);
    const [isLeaveActionInProgress, setIsLeaveActionInProgress] = useState(false);

    useEffect(() => {
        API.teams.get(teamId).then((data) => {
            setTeamName(data.name);
            setInitialColor(data.color);
        });

        API.invitations.getOutgoingTeamInvitations("OPEN", teamId).then(setUnprocessedInvitations);
    }, [teamId]);

    function onEditTeam(e) {
        e.preventDefault();
        setIsUpdateActionInProgress(true);

        API.teams
            .update(teamId, {
                newName: teamName,
                color: color.hex.toString(),
            })
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsUpdateActionInProgress(false);
            });
    }

    function onSendInvites(e) {
        e.preventDefault();
        setIsInviteActionInProgress(true);
        API.invitations
            .create({
                teamId: teamId,
                invitedIds: usersToInvite.map((user) => user.id),
            })
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsInviteActionInProgress(false);
            });
    }

    function onLeaveTeam() {
        setIsLeaveActionInProgress(true);
        API.teams
            .leave(teamId)
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsLeaveActionInProgress(false);
            });
    }

    function onUndoInvitation(id) {
        API.invitations.deleteInvitation(id).then(() => {
            API.invitations
                .getOutgoingTeamInvitations("OPEN", teamId)
                .then(setUnprocessedInvitations);
        });
    }

    return (
        <form className="p-3 teamCreationForm" onSubmit={onEditTeam} autoComplete="off">
            <FormHeaderRow headerText="Редактировать команду" />

            <InputTextFormItem
                label="Название команды"
                value={teamName}
                handleChange={setTeamName}
            />

            <div className="mt-4 d-flex">
                <p className="mr-3">Цвет для задач этой команды</p>
                <InputColorFormItem value={color} setValue={setColor} initialColor={initialColor} />
            </div>

            <SuccessFormButton btnText="СОХРАНИТЬ ИЗМЕНЕНИЯ" loading={isUpdateActionInProgress} />

            <ParticipantList participants={[]} />

            <p className="mt-4">Пригласить новых пользователей:</p>
            <AutocompleteUsers
                onSendInvites={onSendInvites}
                usersToInvite={usersToInvite}
                setUsersToInvite={setUsersToInvite}
                isInviteActionInProgress={isInviteActionInProgress}
            />

            <p className="mt-4">Отправленные приглашения:</p>
            {unprocessedInvitations.map((invitation) => (
                <UnprocessedOutgoingInvitationItem
                    invitation={invitation}
                    onUndoInvitation={onUndoInvitation}
                />
            ))}

            <RemovalFormButton
                btnText="ПОКИНУТЬ КОМАНДУ"
                onClick={onLeaveTeam}
                loading={isLeaveActionInProgress}
            />
        </form>
    );
}

function AutocompleteUsers(props) {
    const [username, setUsername] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);

    useEffect(() => {
        if (username.length > 2) {
            API.users
                .filterByUsername({
                    username: username,
                })
                .then((users) => {
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
                getOptionLabel={(option) => option.login}
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

            <CommonActionFormButton
                btnText="ПРИГЛАСИТЬ"
                className="mt-3"
                onClick={props.onSendInvites}
                disabled={!props.usersToInvite || +props.usersToInvite.length === 0}
                loading={props.isInviteActionInProgress}
            />
        </div>
    );
}

function ParticipantList(props) {
    const [participants /*setParticipants*/] = useState(props.participants || []);

    if (!participants || +participants.length === 0) {
        return null;
    }

    return (
        <>
            <p className="mt-4">Participants:</p>
            <List>
                {participants.map((participant) => (
                    <TeamMemberItem key={participant.id} participant={participant} />
                ))}
            </List>
        </>
    );
}
