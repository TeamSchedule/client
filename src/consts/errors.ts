import { MIN_TEAM_NAME_LEN, MIN_USERNAME_LENGTH } from "./common";

const ERRORS = {
    SignIn: {
        WrongCredentials: "Неправильный логин или пароль",
    },
    SignUp: {
        NameAlreadyExist: "Это имя уже занято",
        TooShortName: `Имя должно быть минимум ${MIN_USERNAME_LENGTH} символа`,
        PasswordsDontMatch: "Пароли не совпадают",
    },
    Service: {
        ServiceUnavailable: "Сервис недоступен, попробуйте позже",
    },
    Team: {
        TooShortName: `Минимальная длина названия команды ${MIN_TEAM_NAME_LEN} символа`,
    },
};

export default ERRORS;
