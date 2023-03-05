import React from "react";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { loginPath } from "../../routes/paths";

export default function SuccessRegisteredMsg() {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" component="h1" sx={{ mb: 4 }}>
                    Завершение регистрации
                </Typography>

                <Typography variant="body1" component="p">
                    На Вашу почту было выслано письмо для активации аккаунта. Перейдите по ссылке в этом письме.
                </Typography>

                <p>
                    После этого можно перейти на <Link to={loginPath}>страницу входа.</Link>
                </p>
            </Box>
        </Container>
    );
}
