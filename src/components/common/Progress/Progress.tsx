import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Progress() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, width: "100%" }}>
            <CircularProgress />
        </Box>
    );
}
