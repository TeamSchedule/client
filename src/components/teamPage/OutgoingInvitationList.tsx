import { OutgoingInvitationItem } from "./OutgoingInvitationItem";
import React, { useEffect, useState } from "react";
import { API } from "../../api/api";
import { OutgoingInvitationItemSchema } from "../../api/schemas/responses/invitations";

interface OutgoingInvitesProps {
    teamId: number | null;
}
export default function OutgoingInvitationList({ teamId }: OutgoingInvitesProps) {
    const [unprocessedOutgoingInvitations, setUnprocessedOutgoingInvitations] = useState<
        Array<OutgoingInvitationItemSchema>
    >([]);

    function loadOutgoingTeamInvitations() {
        if (!teamId) return;
        API.invitations.getOutgoingTeamInvitations("OPEN", teamId).then(setUnprocessedOutgoingInvitations);
    }

    useEffect(() => {
        loadOutgoingTeamInvitations();
    }, []);

    function onUndoInvitation(id: number) {
        if (!teamId) return;
        API.invitations.deleteInvitation(id).then(loadOutgoingTeamInvitations);
    }

    return (
        <>
            <p className="mt-4">Отправленные приглашения:</p>
            {unprocessedOutgoingInvitations.map((invitation: OutgoingInvitationItemSchema) => (
                <OutgoingInvitationItem invitation={invitation} onUndoInvitation={onUndoInvitation} />
            ))}
        </>
    );
}