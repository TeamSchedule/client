import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import WorkStatusPlate from "../../common/tasks_events/WorkStatusPlate";
import { getTimeRepresentation } from "../../../utils/dateutils";
import { TaskActionsProps, TaskViewProps } from "./interfaces";

interface DesktopCalendarTaskItemProps extends TaskViewProps, TaskActionsProps {}

export default function DesktopCalendarTaskItem(props: DesktopCalendarTaskItemProps) {
    const theme = useTheme();

    return (
        <>
            <Box
                sx={{
                    "&:hover": {
                        cursor: "pointer",
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: props.task.event?.color || "#f1f1f1",
                    color: theme.palette.getContrastText(props.task.event?.color || "#ffffff"),
                    borderWidth: props.task.event ? 0 : "1px",
                    borderStyle: "solid",
                    borderColor: "#d0d0d0",
                    borderRadius: 1,
                    flexGrow: 1,
                    px: "2px",
                }}
                onClick={props.navigateToFull}
            >
                <Typography
                    sx={{
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "clip",
                        mr: "5px",
                    }}
                >
                    {props.task.name}
                </Typography>
                <Box sx={{ display: "flex" }}>
                    <Typography
                        component="div"
                        sx={{
                            fontSize: "0.9rem",
                            lineHeight: 1,
                            mt: "5px",
                        }}
                    >
                        {getTimeRepresentation(new Date(props.task.expirationTime))}
                    </Typography>
                    <WorkStatusPlate status={props.task.taskStatus} />
                </Box>
            </Box>
        </>
    );
}
