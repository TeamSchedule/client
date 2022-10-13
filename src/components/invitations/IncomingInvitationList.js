import React from "react";
import List from "@mui/material/List";
import IncomingInvitationItem from "./IncomingInvitationItem";

export default function IncomingInvitationList({ incomingInvitations, setIncomingInvitations }) {
    if (!incomingInvitations || +incomingInvitations.length === 0) {
        return (
            <>
                <p>У вас нет приглашений</p>
            </>
        );
    }

    return (
        <List>
            {incomingInvitations.map((invitation) => (
                <IncomingInvitationItem
                    key={invitation.id}
                    invitation={invitation}
                    setIncomingInvitations={setIncomingInvitations}
                />
            ))}
        </List>
    );
}
