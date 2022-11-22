import React, { useEffect, useState } from "react";
import { API } from "../../api/api";
import { OutgoingInvitationItemSchema } from "../../api/schemas/responses/invitations";
import OutgoingInvitationItem from "../invites/OutgoingInvitationItem";
import { useParams } from "react-router-dom";

export default function OutgoingInvitationList() {
    const { teamId } = useParams();
    const [outgoingInvitations, setOutgoingInvitations] = useState<Array<OutgoingInvitationItemSchema>>([]);

    function loadOutgoingTeamInvitations() {
        if (!teamId) return;
        API.invitations.getOutgoingTeamInvitations("OPEN", +teamId).then(setOutgoingInvitations);
    }

    useEffect(() => {
        loadOutgoingTeamInvitations();
    }, []);

    function onUndoInvitation(id: number) {
        if (!teamId) return;
        API.invitations.deleteInvitation(id).then(loadOutgoingTeamInvitations);
        API.invitations.deleteInvitation(id).then(() => {});
    }

    if (outgoingInvitations.length === 0) return null;
    return (
        <>
            <p className="mt-4">Отправленные приглашения:</p>
            {outgoingInvitations.map((invitation: OutgoingInvitationItemSchema) => (
                <OutgoingInvitationItem
                    key={invitation.id}
                    invitation={invitation}
                    onUndoInvitation={onUndoInvitation}
                />
            ))}
        </>
    );
}
