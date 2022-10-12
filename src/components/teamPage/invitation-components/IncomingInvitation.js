import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import SuccessFormButton from "../../buttons/SuccessFormButton";
import RemovalFormButton from "../../buttons/RemovalFormButton";

export default function IncomingInvitation(props) {
    return (
        <>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="center">
                <ListItemAvatar>
                    <Avatar alt="T" src="/" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <span>
                            {props.team.name}&nbsp;(Invited by {props.invitingId})
                        </span>
                    }
                />

                <SuccessFormButton
                    btnText="ВСТУПИТЬ"
                    fullWidth={false}
                    onClick={() => props.onRejectClick(props.id)}
                />

                <div style={{ width: "15px" }}></div>

                <RemovalFormButton btnText="ОТКЛОНИТЬ" fullWidth={false} />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}
