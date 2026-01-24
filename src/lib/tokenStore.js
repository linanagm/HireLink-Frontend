const ACCESS_KEY = "token";

/**
 * Retrieves the access token from local storage or session storage.
 *
 * @returns {string|null} The access token if found, otherwise null.
 */
export function getAccessToken() {
    return localStorage.getItem(ACCESS_KEY) || sessionStorage.getItem(ACCESS_KEY);
}

/**
 * Saves the access token to local storage or session storage.
 * If rememberMe is true, token is saved to local storage.
 * If rememberMe is false, token is saved to session storage.
 * @param {string} token - The access token to save.
 * @param {boolean} rememberMe - Whether to save the token to local storage or session storage.
 */
export function setAccessToken(token, rememberMe = false) {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(ACCESS_KEY, token);
}

/**
 * Saves the access token to local storage.
 * This function will save the access token to local storage.
 * It is recommended to use this function when the user chooses to remember their login.
 * @param {string} token - The access token to save.
 */
export function saveAccessToken(token) {
    localStorage.setItem(ACCESS_KEY, token);
}
/**
 * Clears the access token from local storage and session storage.
 * This function is useful when a user logs out and you want to clear their access token.
 * @example
 * clearAccessToken();
 */
export function clearAccessToken() {
    localStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(ACCESS_KEY);
}
