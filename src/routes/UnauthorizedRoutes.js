import React from "react";
import { Route, Routes } from "react-router-dom";

import App from "../components/App";
import Welcome from "../components/index/Welcome";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import NotFound from "../components/generic/NotFound";
import SuccessRegisteredMsg from "../components/auth/SuccessRegisteredMsg";

export default function UnauthorizedRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Welcome />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="signup" element={<RegisterForm />} />
                <Route path="ready" element={<SuccessRegisteredMsg />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
