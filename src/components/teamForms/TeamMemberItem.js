import React from "react";
import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import UserAvatar from "../avatars/UserAvatar";

export function TeamMemberItem({ participant }) {
    return (
        <>
            <ListItem key={participant.id} disablePadding>
                <ListItemButton>
                    <ListItemAvatar>
                        <UserAvatar
                            alt={`${participant.username}'s avatar`}
                            src={`/static/images/avatar/.jpg`}
                        />
                    </ListItemAvatar>
                    <ListItemText primary={`${participant.username}`} />
                </ListItemButton>
            </ListItem>
        </>
    );
}
