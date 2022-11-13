import React from "react";
import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { UserAvatar } from "../avatars";

interface TeamMemberItemProps {
    participant: any;
}

export function TeamMemberItem({ participant }: TeamMemberItemProps) {
    return (
        <>
            <ListItem key={participant.id} disablePadding>
                <ListItemButton>
                    <ListItemAvatar>
                        <UserAvatar imgSrc={`/static/images/avatar/.jpg`} size={24} />
                    </ListItemAvatar>
                    <ListItemText primary={`${participant.username}`} />
                </ListItemButton>
            </ListItem>
        </>
    );
}
