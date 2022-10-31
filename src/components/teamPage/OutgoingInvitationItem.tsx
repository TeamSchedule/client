import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { UserAvatar } from "../avatars";
import RemovalFormButton from "../buttons/RemovalFormButton";
import { OutgoingInvitationItemSchema } from "../../api/schemas/responses/invitations";

interface UnprocessedOutgoingInvitationItemProps {
    invitation: OutgoingInvitationItemSchema;
    onUndoInvitation: (id: number) => void;
}

export function OutgoingInvitationItem(props: UnprocessedOutgoingInvitationItemProps) {
    return (
        <>
            <Divider variant="inset" component="div" />
            <ListItem alignItems="center" disableGutters>
                <UserAvatar avatarSrc="/" className="mr-2" />
                <ListItemText primary={<span>{props.invitation.invitedId}</span>} />
                <RemovalFormButton
                    btnText="ОТОЗВАТЬ ПРИГЛАШЕНИЕ"
                    onClick={() => props.onUndoInvitation(props.invitation.id)}
                    fullWidth={false}
                />
            </ListItem>
            <Divider variant="inset" component="div" />
        </>
    );
}
