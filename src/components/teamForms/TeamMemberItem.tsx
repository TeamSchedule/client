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
                        <UserAvatar avatarSrc={`/static/images/avatar/.jpg`} />
                    </ListItemAvatar>
                    <ListItemText primary={`${participant.username}`} />
                </ListItemButton>
            </ListItem>
        </>
    );
}
