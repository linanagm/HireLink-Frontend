// lib/errorMapper.js
export function getUserFriendlyError(err, fallback = "Something went wrong. Please try again.") {
    // normalized response : { ok:false, message, statusCode, ... }
    const status = err?.statusCode || err?.response?.status;
    const data = err?.response?.data || err;

    const msg = data?.message || data?.error || "";

    const code = data?.code || data?.errorCode;
    const details = data?.details || data?.errors || data?.error_description || "";


    // Priority: code > status+message
    if (code) {
        const mapByCode = {
            EMAIL_ALREADY_EXISTS: "This email is already in use. Try logging in instead.",
            INVALID_CREDENTIALS: "Email or password is incorrect.",
            EMAIL_NOT_VERIFIED: "Please verify your email first, then try again.",
            TOKEN_EXPIRED: "Your session expired. Please log in again.",
            FORBIDDEN: "You don’t have permission to do that.",
        };
        if (mapByCode[code]) return { message: mapByCode[code], code, status, details };
    }

    // --- status-based
    if (status === 400)
        return { message: "Please check the entered data and try again.", status, details };
    if (status === 401)
        return { message: "Please log in to continue.", status, details };
    if (status === 403)
        return { message: "You don’t have permission to do that.", status, details };
    if (status === 404)
        return { message: "We couldn’t find what you’re looking for.", status };
    if (status >= 500)
        return { message: "Server is having a moment. Try again soon.", status };


    // --- message heuristics
    const m = msg.toLowerCase();
    if (m.includes("invalid") && m.includes("password"))
        return { message: "Password is invalid.", status, details };
    if (m.includes("invalid") && m.includes("email"))
        return { message: "Email is invalid.", status, details };
    if (m.includes("already") && m.includes("email"))
        return { message: "This email is already in use.", status, details };

    return { message: fallback, status, details };
}
