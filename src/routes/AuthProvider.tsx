import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { AuthContext } from "../hooks/useAuth";
import { baseUnitPath, loginPath } from "./paths";
import { AuthUserKey } from "../consts/common";

const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useLocalStorage(AuthUserKey);
    const navigate = useNavigate();

    const login = (data: object) => {
        setUser(data);
        navigate(baseUnitPath);
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
