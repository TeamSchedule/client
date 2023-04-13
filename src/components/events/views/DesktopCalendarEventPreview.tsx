import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkStatusPlate from "../../common/tasks_events/WorkStatusPlate";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { observer } from "mobx-react-lite";
import { EventActionsProps, EventViewProps } from "./interfaces";
import theme from "../../../assets/theme";

interface DesktopCalendarEventPreviewProps extends EventViewProps, EventActionsProps {}

function DesktopCalendarEventPreview(props: DesktopCalendarEventPreviewProps) {
    const deadline: Date = new Date(props.event.endDate);

    return (
        <>
            <Box
                sx={{
                    "&:hover": {
                        cursor: "pointer",
                        background: `linear-gradient(100deg, ${theme.palette.primary.main} 40%, rgba(100,100,100,0.2) 95%)`,
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderRadius: "2px",
                    marginBottom: "1px",
                    flexGrow: 1,
                    px: "3px",
                }}
                onClick={props.navigateToFull}
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
                            fontWeight: "bold",
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
