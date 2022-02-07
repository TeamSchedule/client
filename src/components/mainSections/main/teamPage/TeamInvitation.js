import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {API} from "../../../../api-server/api";
import Divider from "@mui/material/Divider";


export default function TeamInvitation(props) {
    function onAcceptClick() {
        API.invitations.acceptInvite(props.id).then(() => {
            alert("Accepted");
        });
    }

    function onRejectClick() {
        API.invitations.rejectInvite(props.id).then(() => {
            alert("Rejected");
        });
    }

    return (
        <>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="center">
                <ListItemAvatar>
                    <Avatar alt="T" src="/" />
                </ListItemAvatar>
                <ListItemText
                            primary={
                                <span>{props.name || "Team name"}&nbsp;(Invited by {props.name || "username"})</span>
                            }
                            secondary={
                                <span>{props.description || "Team description"}</span>
                            }
                />
                <Button variant="contained" color="success" sx={{marginRight: '15px'}}
                        onClick={onAcceptClick}>Accept</Button>
                <Button variant="contained" color="error" onClick={onRejectClick}>Reject</Button>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}
