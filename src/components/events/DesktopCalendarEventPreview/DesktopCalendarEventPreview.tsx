import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkStatusPlate from "../../common/tasks_events/WorkStatusPlate";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { observer } from "mobx-react-lite";

interface DesktopCalendarEventPreviewProps {
    event: EventResponseItemSchema;
}

function DesktopCalendarEventPreview(props: DesktopCalendarEventPreviewProps) {
    const deadline: Date = new Date(props.event.endDate);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // backgroundColor: props.event?.color || "white",
                    // color: theme.palette.getContrastText(props.event?.color || "#ffffff"),
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderRadius: 0,
                    marginBottom: "2px",
                    flexGrow: 1,
                    padding: "1px",
                    px: "3px",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocalActivityIcon sx={{ color: props.event.color || "grey" }} />
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
                        {props.event.name}
                    </Typography>
                </Box>

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
                    <WorkStatusPlate status={props.event.status} />
                </Box>
            </Box>
        </>
    );
}

export default observer(DesktopCalendarEventPreview);
