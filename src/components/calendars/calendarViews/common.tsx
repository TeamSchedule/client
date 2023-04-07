import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FiltersDrawer from "../filters/FiltersDrawer";
import React from "react";
import { useNavigate } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import MenuList from "@mui/material/MenuList";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TaskIcon from "@mui/icons-material/Task";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import Menu from "@mui/material/Menu";
import { CreateNewEventCalendarPath, CreateNewEventPath, CreateNewTaskPath } from "../../../routes/paths";
import Link from "@mui/material/Link";

function CreateNewMenu() {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClickCreateNewMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseCreateNewMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                fullWidth
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={handleClickCreateNewMenu}
                sx={{
                    mr: 2,
                    backgroundColor: "rgb(25,118,210)",
                    background: "linear-gradient(60deg, rgba(25,118,210,1) 5%, rgba(156,39,176,1) 80%)",
                }}
            >
                Создать
            </Button>
            <Menu
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={open}
                onClose={handleCloseCreateNewMenu}
            >
                <MenuList sx={{ minWidth: "180px", py: 0 }}>
                    <Link
                        href={CreateNewTaskPath}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(CreateNewTaskPath);
                        }}
                        sx={{ textDecoration: "none" }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <TaskIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText>Задача</ListItemText>
                        </MenuItem>
                    </Link>
                    <Divider />
                    <Link
                        href={CreateNewEventPath}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(CreateNewEventCalendarPath);
                        }}
                        color="secondary"
                        sx={{ textDecoration: "none" }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <LocalActivityIcon fontSize="small" color="secondary" />
                            </ListItemIcon>
                            <ListItemText>Событие</ListItemText>
                        </MenuItem>
                    </Link>
                </MenuList>
            </Menu>
        </>
    );
}

export function UtilSection() {
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", mx: 2, mb: 2 }}>
                <CreateNewMenu />
                <FiltersDrawer />
            </Box>
        </>
    );
}
