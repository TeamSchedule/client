import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";

export default function FullScreenWrapper() {
    return (
        <>
            <Grid container>
                <Grid item xs={12} md={8} lg={6} sx={{ m: "auto" }}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    );
}
