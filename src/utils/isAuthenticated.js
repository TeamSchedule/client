export default function isAuthenticated() {
    let refreshValidFlag = false;
    const refresh = JSON.parse(localStorage.getItem('refresh')) || "";

    try {
        // get claims from JWT. JWT structure: `headers.claims.signature`
        const payloadB64String = refresh.split(".")[1];

        // convert claims from Base64 to json encoded string
        const payloadJSONString = atob(payloadB64String);
        const payload = JSON.parse(payloadJSONString);
        const exp = +payload['exp'];

        // JWT.exp set in seconds, Date.now() method returns milliseconds
        refreshValidFlag = Date.now() / 1000 < exp;
    } catch (e) {
        if (e instanceof DOMException) {
            console.log("Incorrect token. There is no payload!");
        } else if (e instanceof SyntaxError) {
            console.log("Incorrect JWT syntax.");
        } else {
            console.log("Unrecognized error with JWT.");
        }
        console.log(e);
    }

    return refreshValidFlag;
}
