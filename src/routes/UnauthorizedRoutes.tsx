import React from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import NotFound from "../components/generic/NotFound";
import SuccessRegisteredMsg from "../components/auth/SuccessRegisteredMsg";
import ForgotPasswordForm from "../components/auth/reset_password/ForgotPasswordForm";
import {
    forgotPasswordPath,
    loginPath,
    newPasswordPath,
    notFound,
    registrationPath,
    resetPasswordCodePath,
    startPagePath,
    successRegistrationPath,
} from "./paths";
import ResetPasswordCodeForm from "../components/auth/reset_password/ResetPasswordCodeForm";
import NewPasswordForm from "../components/auth/reset_password/NewPasswordForm";

export const unauthorizedRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path={loginPath} element={<LoginForm />} />
            <Route path={forgotPasswordPath} element={<ForgotPasswordForm />} />
            <Route path={resetPasswordCodePath} element={<ResetPasswordCodeForm />} />
            <Route path={newPasswordPath} element={<NewPasswordForm />} />

            <Route path={registrationPath} element={<RegisterForm />} />
            <Route path={successRegistrationPath} element={<SuccessRegisteredMsg />} />

            <Route path={startPagePath} element={<Navigate to={loginPath} replace={true} />} />
            <Route path={notFound} element={<NotFound />} />
        </>
    )
);
