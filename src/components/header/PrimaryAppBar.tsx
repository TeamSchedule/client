import * as React from "react";
import { ElementType, useContext } from "react";
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
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { EventListPath, NotificationListPath, SettingsPath, TaskListPath, UnitListPath } from "../../routes/paths";
import { NotificationsContext } from "../App";
import { Paper, SvgIcon, Tooltip, useTheme } from "@mui/material";
import { NotificationsResponseItemSchema } from "../../api/schemas/responses/notifications";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import { lightBlue } from "@mui/material/colors";
import MainAvatar from "../MainAvatar";
import { makeAvatarLink } from "../../utils/fileUtils";
import { makeFullName } from "../../utils/userUtils";
import Link from "@mui/material/Link";
import NotificationTray from "../notifications/NotificationsTray/NotificationsTray";

export default function PrimaryAppBar() {
    const navigate = useNavigate();
    const theme = useTheme();
    const contrastPrimaryTextColor: string = theme.palette.getContrastText(theme.palette.primary.main);

    const { user, logout } = useAuth();

    const newNotifications = useContext<NotificationsResponseItemSchema[]>(NotificationsContext);

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

    interface SwipeableAppBarItemProps {
        title: string;
        linkTo: string;
        icon: any;
    }

    function SwipeableAppBarItem(props: SwipeableAppBarItemProps) {
        return (
            <>
                <Link
                    color={contrastPrimaryTextColor}
                    href={props.linkTo}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(props.linkTo);
                        toggleDrawer(false)(e);
                    }}
                    sx={{
                        "&:hover": {
                            color: contrastPrimaryTextColor,
                        },
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        px: 2,
                        py: { xs: "10px", sm: "20px" },
                    }}
                >
                    {props.icon}
                    <Typography sx={{ ml: 1 }}>{props.title}</Typography>
                </Link>
            </>
        );
    }

    const SwipeableAppBarDivider = () => <Divider sx={{ my: "0 !important", background: theme.palette.grey[300] }} />;

    const renderSwipeableAppBar = (
        <SwipeableDrawer
            disableBackdropTransition
            anchor="left"
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <Paper
                elevation={0}
                sx={{
                    height: "100%",
                    borderRadius: 0,
                    background: lightBlue[900],
                    color: theme.palette.grey[300],
                }}
            >
                <Box
                    sx={{
                        minWidth: 300,
                    }}
                >
                    <Toolbar />
                    <Box sx={{ display: "flex", alignItems: "center", mx: 2, my: 1 }}>
                        <MainAvatar src={makeAvatarLink(user?.id ? +user?.id : 0)} fullPath size={35} />
                        <Typography variant="subtitle1" component="p" sx={{ py: 1, px: 2 }}>
                            {makeFullName(user)}
                        </Typography>
                    </Box>

                    <SwipeableAppBarDivider />
                    <SwipeableAppBarItem
                        title="Уведомления"
                        linkTo={NotificationListPath}
                        icon={
                            <Badge badgeContent={newNotifications.length} color="error" variant="dot">
                                <NotificationsIcon />
                            </Badge>
                        }
                    />
                    <SwipeableAppBarDivider />
                    <SwipeableAppBarItem title="Календарь" linkTo={TaskListPath} icon={<CalendarMonthIcon />} />
                    <SwipeableAppBarDivider />
                    <SwipeableAppBarItem title="События" linkTo={EventListPath} icon={<LocalActivityIcon />} />
                    <SwipeableAppBarDivider />
                    <SwipeableAppBarItem title="Отделы" linkTo={UnitListPath} icon={<PeopleIcon />} />
                    <SwipeableAppBarDivider />
                    <SwipeableAppBarItem title="Настройки профиля" linkTo={SettingsPath} icon={<SettingsIcon />} />
                    <SwipeableAppBarDivider />
                </Box>
            </Paper>
        </SwipeableDrawer>
    );

    interface DesktopHeaderLinkItemProps {
        tooltipText: string;
        to: string;
        Icon: ElementType;
    }

    function DesktopHeaderLinkItem(props: DesktopHeaderLinkItemProps) {
        return (
            <Tooltip title={props.tooltipText}>
                <Link
                    href={props.to}
                    color={contrastPrimaryTextColor}
                    sx={{
                        "&:hover": {
                            color: contrastPrimaryTextColor,
                        },
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(props.to);
                    }}
                >
                    <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                        <SvgIcon component={props.Icon} />
                    </IconButton>
                </Link>
            </Tooltip>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {renderSwipeableAppBar}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <DesktopHeaderLinkItem tooltipText="Календарь" to={TaskListPath} Icon={CalendarMonthIcon} />
                        <DesktopHeaderLinkItem tooltipText="События" to={EventListPath} Icon={LocalActivityIcon} />
                        <DesktopHeaderLinkItem tooltipText="Отделы" to={UnitListPath} Icon={PeopleIcon} />
                        <DesktopHeaderLinkItem tooltipText="Настройки профиля" to={SettingsPath} Icon={SettingsIcon} />
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

                    <Tooltip title="Уведомления">
                        <Badge badgeContent={newNotifications.length} color="error" sx={{ left: "-20px" }}>
                            <NotificationTray notification={newNotifications} />
                        </Badge>
                    </Tooltip>

                    <Box sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}>
                        <Typography color="inherit" sx={{ mx: 1 }}>
                            {makeFullName(user)}
                        </Typography>

                        <Link
                            href={SettingsPath}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(SettingsPath);
                            }}
                        >
                            <MainAvatar src={makeAvatarLink(user?.id ? +user?.id : 0)} fullPath size={40} />
                        </Link>
                    </Box>

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
