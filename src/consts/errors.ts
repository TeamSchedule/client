const ERRORS = {
    SignIn: {
        WrongCredentials: "Неправильный логин или пароль",
    },
    SignUp: {
        NameAlreadyExist: "Это имя уже занято",
        PasswordsDontMatch: "Пароли не совпадают",
    },
    Service: {
        ServiceUnavailable: "Сервис недоступен, попробуйте позже",
    },
    Team: {
        TooShortName: "Имя команды слишком короткое. Минимальная длина имени 4 символа",
    },
};

export default ERRORS;
