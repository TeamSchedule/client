import * as React from "react";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import TaskIcon from "@mui/icons-material/Task";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { SettingsPath, EventListPath, NotificationListPath, TaskListPath, UnitListPath } from "../../routes/paths";
import { NotificationsContext } from "../App";
import { Tooltip } from "@mui/material";
import { NotificationsResponseItemSchema } from "../../api/schemas/responses/notifications";

export default function PrimaryAppBar() {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const newNotifications = useContext<NotificationsResponseItemSchema[]>(NotificationsContext);

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [isNotificationsBarOpen, setIsNotificationsBarOpen] = React.useState<boolean>(false);

    const handleNotificationsButtonClick = () => {
        if (isNotificationsBarOpen) {
            navigate(NotificationListPath);
        }
        setIsNotificationsBarOpen(!isNotificationsBarOpen);
    };

    const handleLogout = (
        event: React.MouseEvent<HTMLElement>,
        handler?: (event: React.MouseEvent<HTMLElement>) => void
    ) => {
        if (handler) {
            handler(event);
        }
        logout();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="tasks of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <TaskIcon />
                </IconButton>
                <span>Мои задачи</span>
            </MenuItem>

            <MenuItem onClick={(e) => handleLogout(e)}>
                <IconButton
                    size="large"
                    aria-label="logout menu item"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <LogoutIcon />
                </IconButton>
                <span>Выйти</span>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title="Задачи">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            onClick={() => navigate(TaskListPath)}
                        >
                            <CalendarMonthIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="События">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            onClick={() => navigate(EventListPath)}
                        >
                            <LocalActivityIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Отделы">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            onClick={() => navigate(UnitListPath)}
                        >
                            <PeopleIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Настройки профиля">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            onClick={() => navigate(SettingsPath)}
                        >
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <Typography color="inherit">{user?.login}</Typography>
                    </Box>

                    <Tooltip title="Уведомления">
                        <IconButton
                            size="large"
                            aria-label="show new notifications"
                            color="inherit"
                            onClick={handleNotificationsButtonClick}
                        >
                            <Badge badgeContent={newNotifications.length} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton size="large" aria-label="logout" color="inherit" onClick={handleLogout}>
                            <Badge color="error">
                                <LogoutIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}
