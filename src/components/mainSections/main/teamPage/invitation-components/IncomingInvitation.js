import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";


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
                        <span>{props.team.name}&nbsp;(Invited by {props.invitingId})</span>
                    }
                />
                <Button variant="contained" color="success" sx={{marginRight: '15px'}}
                        onClick={() => props.onAcceptClick(props.id)}>Accept</Button>
                <Button variant="contained" color="error" onClick={() => props.onRejectClick(props.id)}>Reject</Button>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}
