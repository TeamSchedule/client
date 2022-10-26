import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SuccessFormButton from "../buttons/SuccessFormButton";
import RemovalFormButton from "../buttons/RemovalFormButton.tsx";
import { UserAvatar } from "../avatars";
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
            <ListItem alignItems="center" disableGutters>
                <UserAvatar alt="T" avatarSrc="/" className="mr-2" />
                <ListItemText
                    primary={
                        <>
                            <p className="my-0">{invitation.team.name}</p>
                            <p className="my-0">От: {invitation.invitingId}</p>
                        </>
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
