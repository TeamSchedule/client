const DOMAIN = "localhost";
const ENABLE_HTTPS = false;
const PORT = "80";

export const SERVER_ORIGIN = `http${ENABLE_HTTPS ? "s" : ""}://${DOMAIN}:${PORT}/`;
