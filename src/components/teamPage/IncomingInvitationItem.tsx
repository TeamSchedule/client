import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { UserAvatar } from "../avatars";
import { API } from "../../api/api";
import { IncomingInvitationItemSchema } from "../../api/schemas/responses/invitations";
import React from "react";
import { BaseButton } from "../buttons";

interface IncomingInvitationItemProps {
    invitation: IncomingInvitationItemSchema;
    loadIncomingInvitations: () => void;
}
export default function IncomingInvitationItem({ invitation, loadIncomingInvitations }: IncomingInvitationItemProps) {
    function onAcceptClick() {
        API.invitations.accept(invitation.id).then(loadIncomingInvitations);
    }

    function onRejectClick() {
        API.invitations.reject(invitation.id).then(loadIncomingInvitations);
    }

    return (
        <>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="center" disableGutters>
                <UserAvatar avatarSrc="/" className="mr-2" />
                <ListItemText
                    primary={
                        <>
                            <p className="my-0">{invitation.team.name}</p>
                            <p className="my-0">От: {invitation.invitingId}</p>
                        </>
                    }
                />

                <BaseButton text="Вступить" color="success" onClick={onAcceptClick} />
                <div style={{ width: "15px" }}></div>
                <BaseButton text="Отклонить" color="danger" onClick={onRejectClick} />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}
