import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import {API} from "../../../../../api-server/api";


export function RejectedOutgoingInvitation(props) {
    function onDeleteInvitation() {
        function onUndoInvitation() {
            API.invitations.deleteInvitation(props.id).then(data => {

            });
        }
    }

    return (
        <>
            <ListItem alignItems="center">
                <ListItemAvatar>
                    <Avatar alt="U" src="/" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <span>{props.invited.username}</span>
                    }
                />
                <Button variant="contained" color="error" onClick={onDeleteInvitation}>Delete invitation</Button>
            </ListItem>
            <Divider variant="inset" component="div" />
        </>
    );
}


export function UnprocessedOutgoingInvitation(props) {
    function onUndoInvitation() {
        API.invitations.deleteInvitation(props.id).then(data => {

        });
    }

    return (
        <>
            <ListItem alignItems="center">
                <ListItemAvatar>
                    <Avatar alt="U" src="/" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <span>{props.invited.username}</span>
                    }
                />

                <Button variant="contained" color="error" onClick={onUndoInvitation}>Undo invitation</Button>
            </ListItem>
            <Divider variant="inset" component="div" />
        </>
    );
}
