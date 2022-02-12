import List from "@mui/material/List";
import IncomingInvitation from "./IncomingInvitation";
import React from "react";
import {API} from "../../../../../api-server/api";
import {useOutletContext} from "react-router";


export default function IncomingInvitationList(props) {
    const [incomingInvitations, setIncomingInvitations] = useOutletContext();

    function onAcceptClick(id) {
        API.invitations.acceptInvitation(id).then(() => {
            setIncomingInvitations(incomingInvitations.filter(invitation => invitation.id !== id));
        });
    }

    function onRejectClick(id) {
        API.invitations.rejectInvitation(id).then(() => {
            setIncomingInvitations(incomingInvitations.filter(invitation => invitation.id !== id));
        });
    }

    if (!incomingInvitations || +incomingInvitations.length === 0) {
        return <span>You have no any invites</span>;
    }

    return (
        <List>
            {incomingInvitations.map(invitation => <IncomingInvitation key={invitation.id} {...invitation}
                                                                       onAcceptClick={onAcceptClick}
                                                                       onRejectClick={onRejectClick} />)}
        </List>
    );
}
