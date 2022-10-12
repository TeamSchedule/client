import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SuccessFormButton from "../buttons/SuccessFormButton";
import RemovalFormButton from "../buttons/RemovalFormButton";
import UserAvatar from "../avatars/UserAvatar";
import { API } from "../../api/api";

export default function IncomingInvitationItem({ invitation, setIncomingInvitations }) {
    function onAcceptClick() {
        API.invitations.accept(invitation.id).then(setIncomingInvitations);
    }

    function onRejectClick() {
        API.invitations.reject(invitation.id).then(setIncomingInvitations);
    }

    return (
        <>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="center">
                <UserAvatar alt="T" avatarSrc="/" className="mr-2" />
                <ListItemText
                    primary={
                        <span>
                            {invitation.team.name}&nbsp;(Invited by {invitation.invitingId})
                        </span>
                    }
                />

                <SuccessFormButton btnText="ВСТУПИТЬ" fullWidth={false} onClick={onAcceptClick} />
                <div style={{ width: "15px" }}></div>
                <RemovalFormButton btnText="ОТКЛОНИТЬ" fullWidth={false} onClick={onRejectClick} />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}
