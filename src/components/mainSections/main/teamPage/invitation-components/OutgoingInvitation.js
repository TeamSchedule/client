import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";


export function RejectedOutgoingInvitation(props) {
    return (
        <>
            <ListItem alignItems="center">
                <ListItemAvatar>
                    <Avatar alt="U" src="/" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <span>{props.invitedId}</span>
                    }
                />
                <Button variant="contained" color="error" onClick={() => props.onDeleteInvitation(props.id)}>
                    Delete invitation
                </Button>
            </ListItem>
            <Divider variant="inset" component="div" />
        </>
    );
}


export function UnprocessedOutgoingInvitation(props) {
    return (
        <>
            <ListItem alignItems="center">
                <ListItemAvatar>
                    <Avatar alt="U" src="/" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <span>{props.invitedId}</span>
                    }
                />

                <Button variant="contained" color="error" onClick={() => props.onUndoInvitation(props.id)}>
                    Undo invitation
                </Button>
            </ListItem>
            <Divider variant="inset" component="div" />
        </>
    );
}
