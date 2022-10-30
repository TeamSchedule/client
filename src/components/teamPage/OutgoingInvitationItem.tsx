import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { UserAvatar } from "../avatars";
import RemovalFormButton from "../buttons/RemovalFormButton";

interface UnprocessedOutgoingInvitationItemProps {
    invitation: any;
    onUndoInvitation: (id: number) => void;
}
export function OutgoingInvitationItem({ invitation, onUndoInvitation }: UnprocessedOutgoingInvitationItemProps) {
    return (
        <>
            <Divider variant="inset" component="div" />
            <ListItem alignItems="center" disableGutters>
                <UserAvatar avatarSrc="/" className="mr-2" />
                <ListItemText primary={<span>{invitation.invitedId}</span>} />
                <RemovalFormButton
                    btnText="ОТОЗВАТЬ ПРИГЛАШЕНИЕ"
                    onClick={() => onUndoInvitation(invitation.id)}
                    fullWidth={false}
                />
            </ListItem>
            <Divider variant="inset" component="div" />
        </>
    );
}
