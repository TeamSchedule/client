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
import { EventListPath, NotificationListPath, SettingsPath, TaskListPath, UnitListPath } from "../../routes/paths";
import { NotificationsContext } from "../App";
import { Tooltip } from "@mui/material";
import { NotificationsResponseItemSchema } from "../../api/schemas/responses/notifications";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";

export default function PrimaryAppBar() {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const newNotifications = useContext<NotificationsResponseItemSchema[]>(NotificationsContext);

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [isNotificationsBarOpen, setIsNotificationsBarOpen] = React.useState<boolean>(false);

    // открыт sidebar или нет
    const [state, setState] = React.useState<boolean>(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        setState(open);
    };

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

    const renderSwipeableAppBar = (
        <SwipeableDrawer
            disableBackdropTransition
            anchor="left"
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <Box
                sx={{
                    mt: 2,
                    minWidth: 300,
                }}
            >
                <Divider sx={{ my: "0 !important" }} />
                <MenuItem
                    onClick={(e) => {
                        navigate(TaskListPath);
                        toggleDrawer(false)(e);
                    }}
                    sx={{ py: { xs: 1, sm: 2 } }}
                >
                    <CalendarMonthIcon sx={{ mr: 1 }} />
                    Задачи
                </MenuItem>
                <Divider sx={{ my: "0 !important" }} />
                <MenuItem
                    onClick={(e) => {
                        navigate(EventListPath);
                        toggleDrawer(false)(e);
                    }}
                    sx={{ py: { xs: 1, sm: 2 } }}
                >
                    <LocalActivityIcon sx={{ mr: 1 }} />
                    События
                </MenuItem>
                <Divider sx={{ my: "0 !important" }} />
                <MenuItem
                    onClick={(e) => {
                        navigate(UnitListPath);
                        toggleDrawer(false)(e);
                    }}
                    sx={{ py: { xs: 1, sm: 2 } }}
                >
                    <PeopleIcon sx={{ mr: 1 }} />
                    Отделы
                </MenuItem>
                <Divider sx={{ my: "0 !important" }} />
                <MenuItem
                    onClick={(e) => {
                        navigate(SettingsPath);
                        toggleDrawer(false)(e);
                    }}
                    sx={{ py: { xs: 1, sm: 2 } }}
                >
                    <SettingsIcon sx={{ mr: 1 }} />
                    Настройки профиля
                </MenuItem>
                <Divider sx={{ my: "0 !important" }} />
            </Box>
        </SwipeableDrawer>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            {renderSwipeableAppBar}
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
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
                    </Box>

                    <Box sx={{ display: { xs: "block", md: "none" } }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

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
