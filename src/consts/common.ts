// минимальная длина логина
const MIN_USERNAME_LENGTH: number = 4;

// минимальная длина пароля
const MIN_PASSWORD_LENGTH: number = 6;

// минимальная длина названия команды
const MIN_TEAM_NAME_LEN: number = 4;

// Ключ данных текущего пользователя в localStorage
const AuthUserKey: string = "user";

// Цвет скелетонов
const SkeletonColor: string = "grey.400";

const AllowedEmailDomain: string = "@sfu-kras.ru";

const NotificationRequestPeriodMS: number = 30000;

export {
    AllowedEmailDomain,
    AuthUserKey,
    MIN_PASSWORD_LENGTH,
    MIN_TEAM_NAME_LEN,
    MIN_USERNAME_LENGTH,
    SkeletonColor,
    NotificationRequestPeriodMS,
};
