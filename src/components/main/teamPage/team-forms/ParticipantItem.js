import React from "react";
import {ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";


export function ParticipantItem(props) {
    return (
        <>
            <ListItem key={props.id} disablePadding>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar alt={`${props.username}'s avatar`} src={`/static/images/avatar/.jpg`} />
                    </ListItemAvatar>
                    <ListItemText primary={`${props.username}`} />
                </ListItemButton>
            </ListItem>
        </>
    );
}
