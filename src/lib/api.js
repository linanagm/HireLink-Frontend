// import axiosClient from "../config/axiosClient";


// /**
//  * Makes an API request using axios.
//  * Returns a normalized response object with ok, message, and data properties.
//  * If the request fails, it calls handleError and returns the result.
//  * @param {string} method - The HTTP method to use (e.g. GET, POST, PUT, DELETE)
//  * @param {string} url - The URL to make the request to
//  * @param {Object} [data] - Optional data to send with the request
//  * @param {Object} [config] - Optional config for the request
//  * @returns {Promise<Object>} A promise that resolves with the normalized response object
//  */

import axiosClient from "../config/axiosClient";

export async function api(method, url, data = null, config = {}) {
    try {
        const m = method.toLowerCase();

        const response =
            m === "get" || m === "delete"
                ? await axiosClient[m](url, config)           //  GET/DELETE
                : await axiosClient[m](url, data, config);    // POST/PUT/PATCH

        return {
            ok: true,
            message: response?.data?.message ?? null,
            data: response?.data?.data ?? response?.data?.paylod ?? null,
            status: response?.status ?? 200,
        };
    } catch (error) {

        return {
            ok: false,
            message:
                error?.response?.data?.message ||
                error?.message ||
                "Request failed",
            status: error?.response?.status ?? null,
            data: null,
            error,
        };
    }
}
