/* eslint-disable react-hooks/exhaustive-deps */
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { AuthContext } from "../hooks/useAuth";
import { loginPath, UnitListPath } from "./paths";
import { AuthUserKey } from "../consts/common";

const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useLocalStorage(AuthUserKey);
    const navigate = useNavigate();

    const login = (data: object) => {
        setUser(data);
        navigate(UnitListPath);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        navigate(loginPath);
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [user]
    );

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
};

export default AuthProvider;
