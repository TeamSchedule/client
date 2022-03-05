import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Autocomplete, TextField} from "@mui/material";
import List from "@mui/material/List";

import {useNavigate, useParams} from "react-router";
import {API} from "../../../../../api/api";
import {selectEditedTeam} from "../../../../../features/editedTeamSlice";
import {TeamColorInput, TeamNameItem, TeamSubmitButton} from "./team-form-items";
import CloseFormIcon from "../../../../generic/CloseFormIcon";
import {ParticipantItem} from "./ParticipantItem";
import {UnprocessedOutgoingInvitation} from "../invitation-components/OutgoingInvitation";
import Button from "@mui/material/Button";
import "../teamPage.css";


export default function TeamEditingForm() {
    const {teamId} = useParams();
    const [color, setColor] = useState();
    const editedTeam = useSelector(selectEditedTeam);
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState("");
    const [teamParticipants, setTeamParticipants] = useState([]);
    const [teamAdmin, setTeamAdmin] = useState("");

    const [unprocessedInvitations, setUnprocessedInvitations] = useState([]);
    const [rejectedInvitations, setRejectedInvitations] = useState([]);

    const [usersToInvite, setUsersToInvite] = useState([]);

    function getTeamData() {
        API.teams.get(teamId).then(data => {
            setTeamName(data.name);
            setTeamParticipants(data.users.slice());
            setTeamAdmin(data.admin || "");
        });
    }

    useEffect(() => {
        getTeamData();
        // if (teamAdmin === userInfo.username) {
        if (true) {
            API.invitations.getOutgoingTeamInvitations().then(data => {
                const invitations = data.filter(invitation => +invitation.team.id === +teamId);
                setUnprocessedInvitations(invitations.filter(invitation => invitation.inviteStatus === "OPEN"));
                setRejectedInvitations(invitations.filter(invitation => invitation.inviteStatus === "REJECTED"));
            });
        }
    }, []);


    function onEditTeam(e) {
        e.preventDefault();

        API.teams.update({
            id: teamId,
            name: document.getElementById("teamName").value,
            // color: color.hex.toString(),
        }).then(() => {
        });
    }

    function onSendInvites(e) {
        e.preventDefault();

        API.invitations.createInvitation({
            teamId: teamId,
            membersLogins: usersToInvite.map(user => user.login),
        });
    }

    function onDeleteInvitation(id) {
        API.invitations.deleteInvitation(id).then(() => {
            setRejectedInvitations(rejectedInvitations.filter(invitation => +invitation.id !== +id));
        });
    }

    function onLeaveTeam() {
        API.teams.leave(teamId).then(() => {
            navigate(-1);
        });
    }


    function onUndoInvitation(id) {
        API.invitations.deleteInvitation(id).then(() => {
            setUnprocessedInvitations(unprocessedInvitations.filter(invitation => +invitation.id !== +id));
        });
    }

    useEffect(() => {
        console.log(color);
    }, [color])
    return (
        <form className="p-3 teamCreationForm" onSubmit={onEditTeam} autoComplete="off">
            <div className="d-flex justify-content-between">
                <p className="fw-bold">Edit team</p>
                <CloseFormIcon />
            </div>

            <TeamNameItem value={teamName} setValue={setTeamName} />
            <TeamColorInput value={color} setValue={setColor} />
            <TeamSubmitButton btnText="Save changes" />

            <ParticipantList participants={editedTeam.users} />

            <p className="mt-4">Invite participants:</p>
            <AutocompleteUsers onSendInvites={onSendInvites}
                               usersToInvite={usersToInvite}
                               setUsersToInvite={setUsersToInvite} />

            <p className="mt-4">Unprocessed invites:</p>
            {unprocessedInvitations.map(invitation => <UnprocessedOutgoingInvitation {...invitation}
                                                                                     onUndoInvitation={onUndoInvitation} />)}

            <Button variant="contained" color="error" onClick={onLeaveTeam} fullWidth={true}>
                Leave team
            </Button>
        </form>
    );
}


function AutocompleteUsers(props) {
    const [username, setUsername] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);

    useEffect(() => {
        if (username.length > 2) {
            API.users.filterByUsername({
                "username": username,
            }).then(res => {
                setFoundUsers(res.data);
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
                getOptionLabel={(option) => option.username}
                onChange={(e, v) => props.setUsersToInvite(v)}
                renderInput={(params) => (
                    <TextField {...params} label="Usernames" placeholder="Username"
                               value={username}
                               onChange={e => setUsername(e.target.value)} />
                )}
            />

            <TeamSubmitButton btnText="Send invites"
                              onClick={props.onSendInvites}
                              disabled={!props.usersToInvite || +props.usersToInvite.length === 0} />
        </div>
    );
}


function ParticipantList(props) {
    const [participants, /*setParticipants*/] = useState(props.participants || []);

    if (!participants || +participants.length === 0) {
        return null;
    }

    return (
        <>
            <p className="mt-4">Participants:</p>
            <List>
                {participants.map(participant => <ParticipantItem key={participant.id} {...participant} />)}
            </List>
        </>
    );
}
