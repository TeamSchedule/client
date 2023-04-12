import { NonAuthedPaths } from "../routes/paths";

export const isNonAuthenticatedURL: boolean = NonAuthedPaths.some((path) => {
    console.log(window.location.pathname);
    return window.location.pathname.startsWith(path);
});
