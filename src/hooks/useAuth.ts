import { createContext, useContext } from "react";
import { UserSchema } from "../api/schemas/responses/users";

export interface AuthContextProps {
    login: (data: object) => void;
    logout: () => void;
    user: UserSchema | null;
}

export const AuthContext = createContext<AuthContextProps>({
    login: (data: object) => {},
    logout: () => {},
    user: null,
});

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
