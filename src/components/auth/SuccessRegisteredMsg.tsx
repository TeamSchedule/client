import React from "react";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { loginPath } from "../../routes/paths";
import { useNavigate } from "react-router-dom";

export default function SuccessRegisteredMsg() {
    const navigate = useNavigate();

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
                <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
                    Завершение регистрации
                </Typography>

                <Typography variant="subtitle1" component="p">
                    На Вашу почту было выслано письмо для активации аккаунта. Перейдите по ссылке в этом письме.
                </Typography>

                <Typography variant="body1" component="p">
                    После этого можно перейти на&nbsp;
                    <Link
                        href={loginPath}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(loginPath);
                        }}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        страницу входа
                    </Link>
                    &nbsp;.
                </Typography>
            </Box>
        </Container>
    );
}
