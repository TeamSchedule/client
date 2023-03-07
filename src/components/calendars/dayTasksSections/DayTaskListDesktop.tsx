import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Toolbar from "@mui/material/Toolbar";
import { TodayTaskList } from "./common";

interface DayTaskListDesktopProps {
    day: Date;
    tasks: TaskResponseItemSchema[];
}

export default function DayTaskListDesktop(props: DayTaskListDesktopProps) {
    // открыт sidebar или нет
    const [openState, setOpenState] = React.useState<boolean>(true);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        setOpenState(open);
    };

    return (
        <Box>
            <SwipeableDrawer
                hideBackdrop
                disableBackdropTransition
                anchor="right"
                open={openState}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                sx={{ minWidth: "30px" }}
            >
                <Toolbar />
                <Box
                    sx={{
                        minWidth: "280px",
                        p: 2,
                        display: {
                            sx: "none",
                            md: "block",
                        },
                    }}
                >
                    <TodayTaskList {...props} />

                    <IconButton onClick={toggleDrawer(!openState)} aria-label="reset" color="primary">
                        {openState ? (
                            <KeyboardDoubleArrowRightIcon fontSize="large" sx={{ p: 0, m: 0 }} />
                        ) : (
                            <KeyboardDoubleArrowLeftIcon fontSize="large" sx={{ p: 0, m: 0 }} />
                        )}
                    </IconButton>
                </Box>
            </SwipeableDrawer>
        </Box>
    );
}
