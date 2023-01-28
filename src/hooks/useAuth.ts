import { createContext, useContext } from "react";
import { UserSchema } from "../api/schemas/responses/users";

export interface AuthContextProps {
    login: (data: object) => void;
    logout: () => void;
    user: UserSchema | null;
}

/**
 * Конекст аутентификации. Хранит текущего пользователя `user` и методы `login`/`logout`.
 * */
export const AuthContext = createContext<AuthContextProps>({
    login: (data: object) => {},
    logout: () => {},
    user: null,
});

/**
 * Кастомный хук-обертка для доступа к данным контекста `AuthContext`.
 * */
const useAuth = () => {
    return useContext<AuthContextProps>(AuthContext);
};

export default useAuth;
