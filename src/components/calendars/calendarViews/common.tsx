import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FiltersDrawer, { FiltersDrawerProps } from "../filters/FiltersDrawer";
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
import { CreateNewEventPath, CreateNewTaskPath } from "../../../routes/paths";
import Link from "@mui/material/Link";

interface UtilSectionProps extends FiltersDrawerProps {}

export function UtilSection(props: UtilSectionProps) {
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
            <Box sx={{ display: "flex", justifyContent: "center", mx: 2, mb: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={handleClickCreateNewMenu}
                    color="secondary"
                    sx={{ mr: 2 }}
                >
                    Создать
                </Button>
                <Menu
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={open}
                    onClose={handleCloseCreateNewMenu}
                >
                    <MenuList sx={{ minWidth: "200px" }}>
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
                                    <TaskIcon fontSize="small" />
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
                                navigate(CreateNewEventPath);
                            }}
                            sx={{ textDecoration: "none" }}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <LocalActivityIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Событие</ListItemText>
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Menu>

                <FiltersDrawer {...props} />
            </Box>
        </>
    );
}
