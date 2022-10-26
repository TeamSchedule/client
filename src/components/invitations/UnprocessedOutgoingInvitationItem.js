import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { UserAvatar } from "../avatars";
import RemovalFormButton from "../buttons/RemovalFormButton.tsx";

export function UnprocessedOutgoingInvitationItem({ invitation, onUndoInvitation }) {
    return (
        <>
            <Divider variant="inset" component="div" />
            <ListItem alignItems="center" disableGutters>
                <UserAvatar alt="T" avatarSrc="/" className="mr-2" />
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
