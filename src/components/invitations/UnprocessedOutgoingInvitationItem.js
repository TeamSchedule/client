import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import UserAvatar from "../avatars/UserAvatar";
import RemovalFormButton from "../buttons/RemovalFormButton";

export function UnprocessedOutgoingInvitationItem({ invitation, onUndoInvitation }) {
    return (
        <>
            <Divider variant="inset" component="div" />
            <ListItem alignItems="center">
                <UserAvatar alt="T" avatarSrc="/" className="mr-2" />
                <ListItemText primary={<span>{invitation.invitedId}</span>} />
                <RemovalFormButton
                    btnText="ОТМЕНИТЬ ПРИГЛАШЕНИЕ"
                    onClick={() => onUndoInvitation(invitation.id)}
                />
            </ListItem>
            <Divider variant="inset" component="div" />
        </>
    );
}
