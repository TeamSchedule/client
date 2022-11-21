import React, { useEffect, useState } from "react";
import { API } from "../../api/api";
import { OutgoingInvitationItemSchema } from "../../api/schemas/responses/invitations";

interface OutgoingInvitesProps {
    teamId: number | null;
}

export default function OutgoingInvitationList({ teamId }: OutgoingInvitesProps) {
    const [outgoingInvitations, setOutgoingInvitations] = useState<Array<OutgoingInvitationItemSchema>>([]);

    function loadOutgoingTeamInvitations() {
        if (!teamId) return;
        API.invitations.getOutgoingTeamInvitations("OPEN", teamId).then(setOutgoingInvitations);
    }

    useEffect(() => {
        loadOutgoingTeamInvitations();
    }, []);

    function onUndoInvitation(id: number) {
        if (!teamId) return;
        API.invitations.deleteInvitation(id).then(loadOutgoingTeamInvitations);
    }

    if (outgoingInvitations.length === 0) return null;
    return (
        <>
            <p className="mt-4">Отправленные приглашения:</p>
            {outgoingInvitations.map((invitation: OutgoingInvitationItemSchema) => (
                <OutgoingInvitationItem invitation={invitation} onUndoInvitation={onUndoInvitation} />
            ))}
        </>
    );
}

interface UnprocessedOutgoingInvitationItemProps {
    invitation: OutgoingInvitationItemSchema;
    onUndoInvitation: (id: number) => void;
}

export function OutgoingInvitationItem(props: UnprocessedOutgoingInvitationItemProps) {
    return (
        <>
            {/*<Invitation*/}
            {/*    fromUser={props.invitation.inviting}*/}
            {/*    date={props.invitation.date}*/}
            {/*    mainAvatar={props.invitation.invited}*/}
            {/*>*/}
            {/*    <BaseButton*/}
            {/*        text="Отозвать приглашение"*/}
            {/*        color="danger"*/}
            {/*        onClick={() => props.onUndoInvitation(props.invitation.id)}*/}
            {/*    />*/}
            {/*</Invitation>*/}
        </>
    );
}
