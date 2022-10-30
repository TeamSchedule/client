import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import IncomingInvitationItem from "./IncomingInvitationItem";
import { API } from "../../api/api";
import { IncomingInvitationItemSchema } from "../../api/schemas/responses/invitations";

export default function IncomingInvitationList() {
    const [incomingInvitations, setIncomingInvitations] = useState<Array<IncomingInvitationItemSchema>>([]);

    function loadIncomingInvitations() {
        API.invitations.getIncomingTeamInvitations().then(setIncomingInvitations);
    }

    useEffect(() => {
        loadIncomingInvitations();
    }, []);

    return (
        <List>
            {incomingInvitations.map((invitation) => (
                <IncomingInvitationItem
                    key={invitation.id}
                    invitation={invitation}
                    loadIncomingInvitations={loadIncomingInvitations}
                />
            ))}
        </List>
    );
}
