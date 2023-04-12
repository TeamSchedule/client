import React, { useEffect, useState } from "react";
import { NotificationsResponseItemSchema } from "../../../api/schemas/responses/notifications";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { NotificationListPath } from "../../../routes/paths";
import { useNavigate } from "react-router-dom";
import NotificationItem from "../NotificationItem/NotificationItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";

interface NotificationTrayProps {
    notification: NotificationsResponseItemSchema[];
}

export default function NotificationTray(props: NotificationTrayProps) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const [notifications, setNotifications] = useState<NotificationsResponseItemSchema[]>(props.notification);

    useEffect(() => {
        setNotifications(props.notification);
    }, [props.notification]);

    const open = Boolean(anchorEl);

    return (
        <ClickAwayListener
            onClickAway={() => {
                setAnchorEl(null);
            }}
        >
            <Box>
                <IconButton
                    size="large"
                    aria-label="show new notifications"
                    color="inherit"
                    onClick={handleClick}
                    sx={{ p: "5px", py: 0 }}
                >
                    <NotificationsIcon />
                </IconButton>

                <Menu
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuList sx={{ minWidth: "250px", px: 1 }}>
                        <Box>
                            {notifications.slice(0, 4).map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    setNotifications={() => {}}
                                />
                            ))}

                            <Link
                                href={NotificationListPath}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    navigate(NotificationListPath);
                                }}
                            >
                                <Typography sx={{ textAlign: "center" }}>Посмотреть все</Typography>
                            </Link>
                        </Box>
                    </MenuList>
                </Menu>
            </Box>
        </ClickAwayListener>
    );
}
