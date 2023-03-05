import { UserSchema } from "../api/schemas/responses/users";

export function makeFullName(user: UserSchema | undefined | null): string {
    if (!user) return "Безымянный";
    
    return [user.lastName, user.firstName, user.patronymic].filter(Boolean).join(" ");
}
