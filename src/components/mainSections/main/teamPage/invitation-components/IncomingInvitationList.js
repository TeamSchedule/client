import List from "@mui/material/List";
import IncomingInvitation from "./IncomingInvitation";
import React from "react";
import {API} from "../../../../../api/api";


export default function IncomingInvitationList(props) {
    function onAcceptClick(id) {
        API.invitations.acceptInvitation(id).then(() => {
            props.setIncomingInvitations(props.incomingInvitations.filter(invitation => invitation.id !== id));
        });
    }

    function onRejectClick(id) {
        API.invitations.rejectInvitation(id).then(() => {
            props.setIncomingInvitations(props.incomingInvitations.filter(invitation => invitation.id !== id));
        });
    }

    if (!props.incomingInvitations || +props.incomingInvitations.length === 0) {
        return <span>You have no any invites</span>;
    }

    return (
        <List>
            {props.incomingInvitations.map(invitation => <IncomingInvitation key={invitation.id} {...invitation}
                                                                             onAcceptClick={onAcceptClick}
                                                                             onRejectClick={onRejectClick} />)}
        </List>
    );
}
