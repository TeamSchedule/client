import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { AuthContext } from "../hooks/useAuth";
import { baseCalendarPath, loginPath } from "./paths";
import { AuthUserKey } from "../consts/common";

const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useLocalStorage(AuthUserKey);
    const navigate = useNavigate();

    const login = (data: object) => {
        setUser(data);
        window.location.replace(baseCalendarPath);
    };

    const logout = () => {
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
