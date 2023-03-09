import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import WorkStatusPlate from "../../common/tasks_events/WorkStatusPlate";

interface DesktopCalendarTaskPreviewProps {
    task: TaskResponseItemSchema;
}

export default function DesktopCalendarTaskPreview(props: DesktopCalendarTaskPreviewProps) {
    const theme = useTheme();
    const deadline: Date = new Date(props.task.expirationTime);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: props.task.event?.color || "white",
                    color: theme.palette.getContrastText(props.task.event?.color || "#ffffff"),
                    borderWidth: props.task.event ? 0 : "1px",
                    borderStyle: "solid",
                    borderRadius: 1,
                    marginBottom: "2px",
                    flexGrow: 1,
                    padding: "1px",
                    px: "3px",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "0.9rem",
                        fontWeight: "bold",
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
                        {deadline.toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Typography>
                    <WorkStatusPlate status={props.task.taskStatus} />
                </Box>
            </Box>
        </>
    );
}
