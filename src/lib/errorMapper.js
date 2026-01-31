// lib/errorMapper.js
export function getUserFriendlyError(err, fallback = "Something went wrong. Please try again.") {
    // normalized response : { ok:false, message, statusCode, ... }
    const status = err?.statusCode || err?.response?.status;
    const msg =
        err?.message ||
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "";

    const code =
        err?.code ||
        err?.response?.data?.code ||
        err?.response?.data?.errorCode;

    // Priority: code > status+message
    if (code) {
        const mapByCode = {
            EMAIL_ALREADY_EXISTS: "This email is already in use. Try logging in instead.",
            INVALID_CREDENTIALS: "Email or password is incorrect.",
            EMAIL_NOT_VERIFIED: "Please verify your email first, then try again.",
            TOKEN_EXPIRED: "Your session expired. Please log in again.",
            FORBIDDEN: "You don’t have permission to do that.",
        };
        if (mapByCode[code]) return mapByCode[code];
    }

    // status-based
    if (status === 400) return "Please check the entered data and try again.";
    if (status === 401) return "Please log in to continue.";
    if (status === 403) return "You don’t have permission to do that.";
    if (status === 404) return "We couldn’t find what you’re looking for.";
    if (status >= 500) return "Server is having a moment. Try again soon.";

    // message heuristics 
    const m = msg.toLowerCase();
    if (m.includes("invalid") && m.includes("password")) return "Password is invalid.";
    if (m.includes("invalid") && m.includes("email")) return "Email is invalid.";
    if (m.includes("already") && m.includes("email")) return "This email is already in use.";

    return fallback;
}
