import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import List from "@mui/material/List";

import { useNavigate, useParams } from "react-router";
import { API } from "../../../../api/api";
import { TeamColorInput, TeamNameItem } from "./team-form-items";
import CloseFormIcon from "../../../generic/CloseFormIcon";
import { ParticipantItem } from "./ParticipantItem";
import { UnprocessedOutgoingInvitation } from "../invitation-components/OutgoingInvitation";
import "../teamPage.css";
import SuccessFormButton from "../../../buttons/SuccessFormButton";
import RemovalFormButton from "../../../buttons/RemovalFormButton";
import CommonActionFormButton from "../../../buttons/CommonActionFormButton";

export default function TeamEditingForm() {
    const { teamId } = useParams();
    const [color, setColor] = useState("#000000");
    const [initialColor, setInitialColor] = useState("#ffffff");

    const navigate = useNavigate();
    const [teamName, setTeamName] = useState("");
    const [unprocessedInvitations, setUnprocessedInvitations] = useState([]);

    const [usersToInvite, setUsersToInvite] = useState([]);

    useEffect(() => {
        API.teams.get(teamId).then((data) => {
            setTeamName(data.name);
            setInitialColor(data.color);
        });

        API.invitations.getOutgoingTeamInvitations("OPEN", teamId).then(setUnprocessedInvitations);
    }, [teamId]);

    function onEditTeam(e) {
        e.preventDefault();

        API.teams.update(teamId, {
            newName: document.getElementById("teamName").value,
            color: color.hex.toString(),
        });
    }

    function onSendInvites(e) {
        e.preventDefault();

        API.invitations.create({
            teamId: teamId,
            invitedIds: usersToInvite.map((user) => user.id),
        });
    }

    function onLeaveTeam() {
        API.teams.leave(teamId).then(() => {
            navigate(-1);
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
            <div className="d-flex justify-content-between">
                <p className="fw-bold">Редактировать команду</p>
                <CloseFormIcon />
            </div>

            <TeamNameItem value={teamName} setValue={setTeamName} />
            <TeamColorInput value={color} setValue={setColor} initialColor={initialColor} />
            <SuccessFormButton btnText="СОХРАНИТЬ ИЗМЕНЕНИЯ" />

            <ParticipantList participants={[]} />

            <p className="mt-4">Пригласить новых пользователей:</p>
            <AutocompleteUsers
                onSendInvites={onSendInvites}
                usersToInvite={usersToInvite}
                setUsersToInvite={setUsersToInvite}
            />

            <p className="mt-4">Отправленные приглашения:</p>
            {unprocessedInvitations.map((invitation) => (
                <UnprocessedOutgoingInvitation
                    {...invitation}
                    onUndoInvitation={onUndoInvitation}
                />
            ))}

            <RemovalFormButton btnText="ПОКИНУТЬ КОМАНДУ" onClick={onLeaveTeam} />
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
                onClick={props.onSendInvites}
                disabled={!props.usersToInvite || +props.usersToInvite.length === 0}
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
                    <ParticipantItem key={participant.id} {...participant} />
                ))}
            </List>
        </>
    );
}
