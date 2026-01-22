const ACCESS_KEY = "token";

export function getAccessToken() {
    return localStorage.getItem(ACCESS_KEY) || sessionStorage.getItem(ACCESS_KEY);
}


export function setAccessToken(token, rememberMe) {

    // check if rememberMe is explicitly provided
    // explicitly provided value is either true or false
    if (typeof rememberMe === "boolean") {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(ACCESS_KEY, token);
        return;
    }

    //check if token already exists in local storage
    if (localStorage.getItem(ACCESS_KEY)) {
        localStorage.setItem(ACCESS_KEY, token);
        return;
    }

    //check if token already exists in session storage
    if (sessionStorage.getItem(ACCESS_KEY)) {
        sessionStorage.setItem(ACCESS_KEY, token);
        return;
    }

    // if token doesn't exist in either storage, save it in localStorage
    sessionStorage.setItem(ACCESS_KEY, token);
}

export function clearAccessToken() {
    localStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(ACCESS_KEY);
}
