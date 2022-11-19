import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { UserAvatar } from "../avatars";
import { OutgoingInvitationItemSchema } from "../../api/schemas/responses/invitations";
import { BaseButton } from "../buttons";
import React from "react";

interface UnprocessedOutgoingInvitationItemProps {
    invitation: OutgoingInvitationItemSchema;
    onUndoInvitation: (id: number) => void;
}

export function OutgoingInvitationItem(props: UnprocessedOutgoingInvitationItemProps) {
    return (
        <>
            <Divider variant="inset" component="div" />
            <ListItem alignItems="center" disableGutters>
                <UserAvatar imgSrc="/" size={24} />
                <ListItemText primary={<span>{props.invitation.invitedId}</span>} />
                <BaseButton
                    text="Отозвать приглашение"
                    color="danger"
                    onClick={() => props.onUndoInvitation(props.invitation.id)}
                />
            </ListItem>
            <Divider variant="inset" component="div" />
        </>
    );
}
