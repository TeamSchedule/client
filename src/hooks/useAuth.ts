import { createContext, useContext } from "react";

export const AuthContext = createContext<object | null>(null);

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
